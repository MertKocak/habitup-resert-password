import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import '../styles/global.css';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true); // Şifre doğrulama durumu
  const router = useRouter();
  const { token } = router.query; // URL'den token'ı al

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    // Şifrenin en az 6 karakter uzunluğunda olduğunu kontrol et
    if (newPassword.length >= 6) {
      setIsPasswordValid(true);
    } else {
      setIsPasswordValid(false);
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Şifreler eşleşmiyor!");
      return;
    }

    if (!isPasswordValid) {
      setMessage("Şifre en az 6 karakter olmalıdır!");
      return;
    }

    try {
      const response = await axios.post("https://habitup-backend.onrender.com/reset-password", {
        token,
        password,
      });
      setMessage(response.data.message);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Şifre sıfırlama işlemi başarısız oldu.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-700 via-gray-600 to-black">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96 max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Şifreni Sıfırla</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Yeni Şifre"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={password}
              onChange={handlePasswordChange}
            />
            {!isPasswordValid && password && (
              <p className="text-red-500 text-sm mt-1">Şifre en az 6 karakter olmalıdır.</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Şifreyi Onayla"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 transition duration-300"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              Sıfırla
            </button>
          </div>
        </form>
        {message && (
          <p
            className={`mt-4 text-center text-lg font-semibold ${
              message.includes("başarısız") ? "text-red-500" : "text-green-500"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

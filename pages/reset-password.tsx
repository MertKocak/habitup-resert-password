import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();
  const { token } = router.query; // URL'den token'ı al

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("Şifreler eşleşmiyor!");
      console.log(message)
      return;
    }

    try {
      const response = await axios.post("https://habitup-backend.onrender.com/reset-password", {
        token,
        password,
      });
      setMessage(response.data.message);
      console.log(message)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setMessage("Şifre sıfırlama işlemi başarısız oldu.");
      console.log(message)
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Şifreyi Sıfırla</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="password"
            placeholder="Yeni Şifre"
            className="w-full p-2 border rounded mb-3"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            type="password"
            placeholder="Şifreyi Onayla"
            className="w-full p-2 border rounded mb-3"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Şifreyi Güncelle
          </button>
        </form>
        {message && <p className="mt-3 text-center text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;

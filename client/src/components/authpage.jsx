import { useState } from "react";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ i18n hook

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅ hook for translations

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      let url = isLogin ? "http://127.0.0.1:8000/login" : "http://127.0.0.1:8000/signup";
      let body = isLogin
        ? { email: formData.email, password: formData.password }
        : { username: formData.name, email: formData.email, password: formData.password };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.detail || "Something went wrong");
        return;
      }

      if (isLogin) {
        localStorage.setItem("token", data.access_token);
        setMessage(t("auth.loginSuccess")); // ✅ translated message
        navigate("/");
      } else {
        setMessage(t("auth.signupSuccess")); // ✅ translated message
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again.");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
        <source src="/farm.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-md shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          {isLogin ? t("auth.welcomeBack") : t("auth.createAccount")}
        </h2>
        <p className="text-gray-500 text-center mt-2">
          {isLogin ? t("auth.loginSubtitle") : t("auth.signupSubtitle")}
        </p>

        <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
              <FaUser className="text-gray-500 mr-3" />
              <input
                type="text"
                name="name"
                placeholder={t("auth.namePlaceholder")}
                value={formData.name}
                onChange={handleChange}
                className="w-full outline-none text-gray-700 bg-transparent"
                required
              />
            </div>
          )}

          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              type="email"
              name="email"
              placeholder={t("auth.emailPlaceholder")}
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none text-gray-700 bg-transparent"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
            <FaLock className="text-gray-500 mr-3" />
            <input
              type="password"
              name="password"
              placeholder={t("auth.passwordPlaceholder")}
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none text-gray-700 bg-transparent"
              required
            />
          </div>

          {!isLogin && (
            <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3">
              <FaLock className="text-gray-500 mr-3" />
              <input
                type="password"
                name="confirmPassword"
                placeholder={t("auth.confirmPasswordPlaceholder")}
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full outline-none text-gray-700 bg-transparent"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium shadow transition"
          >
            {isLogin ? t("auth.loginButton") : t("auth.signupButton")}
          </button>
        </form>

        {message && <p className="text-center text-sm mt-4 text-red-500">{message}</p>}

        <p className="text-gray-600 text-sm text-center mt-6">
          {isLogin ? (
            <>
              {t("auth.noAccount")}{" "}
              <button type="button" onClick={() => setIsLogin(false)} className="text-green-600 font-medium hover:underline">
                {t("auth.signupLink")}
              </button>
            </>
          ) : (
            <>
              {t("auth.alreadyAccount")}{" "}
              <button type="button" onClick={() => setIsLogin(true)} className="text-green-600 font-medium hover:underline">
                {t("auth.loginLink")}
              </button>
            </>
          )}
        </p>
      </div>
    </section>
  );
}

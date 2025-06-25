import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "react-use";

export default function Home() {
  const [token, _] = useLocalStorage("token", "");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    } else {
      navigate("/dashboard/contacts", { replace: true });
    }
  }, [token, navigate]);

  return null;
}

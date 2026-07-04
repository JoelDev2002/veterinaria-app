import { useState } from "react";

export function usePasswordVisibility(initialValue: boolean = false){
  const [showPassword, setShowPassword] = useState(initialValue);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return { showPassword, toggleShowPassword };
}
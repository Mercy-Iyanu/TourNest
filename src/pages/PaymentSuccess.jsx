import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const reference = searchParams.get("reference");

  const [status, setStatus] = useState("verifying");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/payment/verify?reference=${reference}`
        );
        if (res.ok) {
          setStatus("success");
        } else {
          setStatus("error");
        }
      } catch (err) {
        setStatus("error");
      }
    };

    if (reference) verify();
  }, [reference]);

  useEffect(() => {
    if (status === "success") {
      setTimeout(() => {
        navigate("/pricing-rule-form", { replace: true });
      }, 5000);
    }
  }, [status]);

  if (status === "verifying") return <div>🔄 Verifying your payment...</div>;
  if (status === "success")
    return <div>✅ Payment confirmed! Thank you 🎉</div>;
  if (status === "error")
    return <div>❌ Payment verification failed. Please contact support.</div>;

  return null;
};

export default PaymentSuccess;

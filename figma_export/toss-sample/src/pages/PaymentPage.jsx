import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PaymentPage = () => {
  const [orderId, setOrderId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [tossReady, setTossReady] = useState(false);

  // ✅ TossPayments SDK 로드 상태 확인
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.TossPayments) {
        setTossReady(true);
        clearInterval(interval);
      }
    }, 100); // 100ms마다 확인

    return () => clearInterval(interval);
  }, []);

  const handlePayment = async () => {
    if (!tossReady) {
      alert('Toss Payments SDK가 아직 로드되지 않았습니다.');
      return;
    }

    const request = {
      lessonId: 1,
      userCouponId: 1,
    };

    const res = await axios.post('http://localhost:8080/api/v1/payments/prepare', request);
    const { orderId, payPrice, lessonTitle } = res.data.data;

    await axios.post('http://localhost:8080/api/v1/payments/saveAmount', {
    orderId,
    amount: payPrice,},
    { withCredentials: true }
  );

    setOrderId(orderId);
    setAmount(payPrice);

    const clientKey = 'test_ck_Z61JOxRQVEY9nJKwxYPDVW0X9bAq';
    const tossPayments = window.TossPayments(clientKey);

    tossPayments.requestPayment('카드', {
      amount: payPrice,
      orderId,
      orderName: lessonTitle,
      successUrl: 'http://localhost:5173/success',
      failUrl: 'http://localhost:5173/fail',
    });
  };

  return (
    <div>
      <h2>레슨 결제</h2>
      <button onClick={handlePayment} disabled={!tossReady}>
        {tossReady ? '결제하기' : 'SDK 로드 중...'}
      </button>
    </div>
  );
};

export default PaymentPage;


import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const SuccessPage = () => {
  const [params] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState(null); // 결제 응답 데이터 상태

  useEffect(() => {
  const confirmPayment = async () => {
    const paymentKey = params.get('paymentKey');
    const orderId = params.get('orderId');
    const amount = params.get('amount');

    console.log('confirm payload:', { paymentKey, orderId, amount: parseInt(amount) });

    try {

      await axios.post('http://localhost:8080/api/v1/payments/verifyAmount', {
        orderId,
        amount: parseInt(amount),},
         { withCredentials: true }
      );


      const res = await axios.post('http://localhost:8080/api/v1/payments/confirm', {
        paymentKey,
        orderId,
        amount: parseInt(amount),
      });

      setPaymentInfo(res.data.data); // 응답의 BaseResponse<TossPaymentResponseDto>.data 부분만 저장

    } catch (error) {
      console.error('결제 확인 실패', error);
    }
  };

  confirmPayment();
}, [params]);


  return (
    <div>
      <h2>✅ 결제 성공</h2>
      <p>결제가 성공적으로 처리되었습니다.</p>

      {paymentInfo && (
        <div style={{ marginTop: '1rem' }}>
          <h3>📄 결제 상세 정보</h3>
          <ul>
            <li><strong>결제 수단:</strong> {paymentInfo.paymentMethod}</li>
            <li><strong>결제 금액:</strong> {paymentInfo.payPrice.toLocaleString()}원</li>
            <li><strong>수업 시작:</strong> {new Date(paymentInfo.startAt).toLocaleString()}</li>
            <li><strong>수업 종료:</strong> {new Date(paymentInfo.endAt).toLocaleString()}</li>
            <li><strong>주소:</strong> {`${paymentInfo.city} ${paymentInfo.district} ${paymentInfo.dong} ${paymentInfo.addressDetail}`}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;

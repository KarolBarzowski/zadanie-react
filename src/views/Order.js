import { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const StyledWrapper = styled.section`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  gap: 15px;
  padding: 15px;
  height: 100%;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  width: 300px;
`;

const Input = styled.input`
  height: 48px;
  border-radius: 5px;
  border: 1px solid silver;
  width: 100%;
  font-family: 'Poppins', sans-serif;
  font-size: 18px;
  color: rgba(0, 0, 0, 0.87);
  padding: 0 10px;
`;

const Paragraph = styled.p`
  font-size: 18px;
  color: ${({ error }) => (error ? 'rgb(255, 59, 48)' : 'rgba(0, 0, 0, 0.6)')};
`;

const Button = styled.button`
  padding: 12px 16px;
  background-color: rgb(0, 122, 255);
  border: none;
  border-radius: 8px;
  color: rgba(255, 255, 255, 0.87);
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;

  :hover {
    background-color: rgb(10, 132, 255);
  }
`;

function Order({ cart }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isError, setIsError] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleValidate = async (e) => {
    e.preventDefault();
    if (firstName.length < 4 || firstName.length > 50) {
      setIsError(true);
      setErrorMsg('Błąd w imieniu!');
      return;
    }

    if (lastName.length < 5 || lastName.length > 50) {
      setIsError(true);
      setErrorMsg('Błąd w nazwisku!');
      return;
    }

    if (!city.length) {
      setIsError(true);
      setErrorMsg('Miejscowość nie może być pusta!');
      return;
    }

    if (!/^\d{2}-\d{3}$/.test(zipCode)) {
      setIsError(true);
      setErrorMsg('Kod pocztowy jest błędny!');
      return;
    }

    setIsError(false);
    const data = {
      order: [...cart],
      first_name: firstName,
      last_name: lastName,
      city,
      zip_code: zipCode,
    };

    try {
      let response = await fetch('http://localhost:3001/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFirstName('');
        setLastName('');
        setCity('');
        setZipCode('');
        setIsSuccess(true);
      } else {
        setIsError(true);
        setErrorMsg('Wystąpił błąd!');
      }
    } catch (error) {
      setIsError(true);
      setErrorMsg('Wystąpił błąd!');
    }
  };

  return (
    <StyledWrapper>
      <h1>Twoje dane</h1>
      <Form onSubmit={handleValidate}>
        <label>
          <Paragraph>Imię</Paragraph>
          <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          <Paragraph>Nazwisko</Paragraph>
          <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          <Paragraph>Miejscowość</Paragraph>
          <Input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <label>
          <Paragraph>Kod pocztowy</Paragraph>
          <Input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
        </label>
        {isError ? <Paragraph error>{errorMsg}</Paragraph> : null}
        <Button type="submit">Zamawiam i płacę</Button>
        {isSuccess ? <Paragraph>Wysłano!</Paragraph> : null}
      </Form>
    </StyledWrapper>
  );
}

const mapStateToProps = ({ cart }) => ({ cart });

export default connect(mapStateToProps)(Order);

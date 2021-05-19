import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import api from "../services/api";
import lightIcon from "../assets/img/icon.svg";
import { setUserSession } from "./Utils/Common";
import history from "../services/history";
import Loading from "./Loading";
import toast from "react-hot-toast";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
    confirmPassword: "",
  });

  const title = "Cadastre-se grátis no Barber Shop";

  async function handleSignUp() {
    if (
      !credentials.email ||
      !credentials.password ||
      !credentials.confirmPassword ||
      !credentials.name
    ) {
      return toast.error("Por favor, preencha todos os campos.");
    }
    if (credentials.password !== credentials.confirmPassword) {
      return toast.error("Senhas não conferem.");
    }
    if (credentials.password.length < 6) {
      return toast.error("Sua senha deve conter pelo menos 6 caracteres.");
    }

    await api
      .post("/users", {
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      })
      .then(() => {
        api
          .post("/users/signin", {
            email: credentials.email,
            password: credentials.password,
          })
          .then((res) => {
            setLoading(false);
            setUserSession(res.data.token, res.data.user);
            return history.push("/dashboard");
          });
      })
      .catch((err) => {
        setLoading(false);
        if (
          (err.response && err.response.status === 401) ||
          (err.response && err.response.status === 400)
        ) {
          return toast.error(err.response.data.message);
        } else {
          return toast.error("Oops! Alguma coisa deu errado.");
        }
      });
  }

  return (
    <Container fluid className="bg-dark vh-100 text-center">
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Container>
        <Row>
          <Col md="4" className="mx-auto">
            <Card bg="dark" className="p-4 text-light border-0 shadow-sm">
              <Form.Row className="d-grid">
                <Link to="/">
                  <img
                    src={lightIcon}
                    alt="icon"
                    className="img-fluid"
                    width="125"
                  />
                </Link>
                <br />
                <Form.Group className="mb-3">
                  <Card.Text>
                    <strong>CADASTRE-SE GRÁTIS</strong>
                  </Card.Text>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    onChange={(e) =>
                      setCredentials({
                        email: e.target.value,
                        password: credentials.password,
                        confirmPassword: credentials.confirmPassword,
                        name: credentials.name,
                      })
                    }
                    value={credentials.email}
                    name="email"
                    placeholder="E-mail"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    onChange={(e) =>
                      setCredentials({
                        name: e.target.value,
                        password: credentials.password,
                        confirmPassword: credentials.confirmPassword,
                        email: credentials.email,
                      })
                    }
                    value={credentials.name}
                    maxLength="50"
                    name="name"
                    placeholder="Nome completo"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={(e) =>
                      setCredentials({
                        password: e.target.value,
                        name: credentials.name,
                        confirmPassword: credentials.confirmPassword,
                        email: credentials.email,
                      })
                    }
                    value={credentials.password}
                    placeholder="Senha"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    onChange={(e) =>
                      setCredentials({
                        confirmPassword: e.target.value,
                        password: credentials.password,
                        name: credentials.name,
                        email: credentials.email,
                      })
                    }
                    value={credentials.confirmPassword}
                    placeholder="Confirme a senha"
                  />
                </Form.Group>
                <Button onClick={handleSignUp} className="btn btn-primary mb-3">
                  {loading ? <Loading /> : <small>ENVIAR</small>}
                </Button>
              </Form.Row>
              <Form.Text className="mb-3">
                Já possui conta? &nbsp;
                <Link to="/signin">Iniciar sessão</Link>
              </Form.Text>
            </Card>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
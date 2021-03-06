import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HelmetTitle from "../components/Layout/HelmetTitle";
import welcomeImg from "../assets/img/undraw_date_picker_gorr.svg";

export default function Welcome() {
  return (
    <Layout>
      <HelmetTitle />
      <Row className="align-items-center">
        <Col md="5"
         className="ms-auto text-center text-md-start mb-3">
          <h2 className="fw-bold">Organize seu tempo</h2>
          <h4 className="text-muted">
            No agendaí, você agenda seu atendimento muito mais fácil e rápido.
          </h4>
          <p />
          <Link className="btn btn-primary" to="/signup">
            Cadastre-se agora! É grátis.
          </Link>
        </Col>
        <Col md="5" className="ms-auto d-none d-sm-block">
          <img src={welcomeImg} className="img-fluid" alt="" width="500" />
        </Col>
      </Row>
    </Layout>
  );
}

import React, { useEffect } from "react";
import { Button } from "react-bootstrap";

const NightMode = ({ ...rest }) => {
  const [state, setState] = React.useState({
    message: "",
  });

  const body = document.body;
  const lightTheme = "light";
  const darkTheme = "dark";
  let theme;

  useEffect(() => {
    (() => {
      if (theme === darkTheme) {
        setState({ message: "Escuro" });
      } else {
        setState({ message: "Claro" });
      }
    })();
  }, []);

  if (localStorage) {
    theme = localStorage.getItem("theme");
  }

  if (theme === lightTheme || theme === darkTheme) {
    body.classList.add(theme);
  } else {
    body.classList.add(lightTheme);
  }

  const switchTheme = () => {
    if (theme === darkTheme) {
      body.classList.replace(darkTheme, lightTheme);
      localStorage.setItem("theme", "light");
      return (theme = lightTheme);
    } else {
      body.classList.replace(lightTheme, darkTheme);
      localStorage.setItem("theme", "dark");
      return (theme = darkTheme);
    }
  };

  return (
    <Button
      variant={theme === darkTheme ? "outline-light" : "outline-dark"}
      {...rest}
      onClick={switchTheme}
    >
      {theme === darkTheme ? (
        <i className="far fa-moon me-2" />
      ) : (
        <i className="far fa-sun me-2" />
      )}
      <span>{state.message}</span>
    </Button>
  );
};

export default NightMode;

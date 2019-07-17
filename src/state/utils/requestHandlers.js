import React from 'react';
import { isEmpty } from 'lodash';
import { notification, Button } from 'antd';

const key = `open${Date.now()}`;
const reloadSW = () => window.location.reload();
const btn = (
  <Button
    type="primary"
    onClick={() => {
      notification.close(key);
      reloadSW();
    }}
  >
    Atualizar Página
  </Button>
);

const successRequestHandler = (res) => res.data;

const errorRequestHandler = async (err) => {
  const { response } = err;

  if (isEmpty(response)) {
    notification.open({
      message: 'Houve um erro durante carregamento da página.',
      description:
        'Por favor, pressione o botão "Atualizar página" para recarregar a página atual.',
      btn,
      key,
    });
  }
};

export default {
  success: successRequestHandler,
  error: errorRequestHandler,
};

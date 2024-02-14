import { IoMdHome, IoMdPeople } from 'react-icons/io';
import { MdPointOfSale } from 'react-icons/md';

export const VALID_PASSWORD_REGEX =
  /^(?=.*?[A-Z])(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*?[a-z])(?=.*?[0-9]).{8,20}$/;

export const navigationLinks = [
  { path: '/login', icon: IoMdHome, label: 'Inicio' },
  { path: '/login/clients', icon: IoMdPeople, label: 'Clientes' },
  { path: '/login/sales', icon: MdPointOfSale, label: 'Ventas' },
];

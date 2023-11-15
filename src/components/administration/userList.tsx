import { Space } from "antd";
import s from "./administration.module.scss";
import { User } from "./user";

const mockUsers = [
  {
    id: 1,
    name: "Aurea Randles",
    email: "arandles0@dmoz.org",
    password: "aO6/DsP'",
    role: "admin",
  },
  {
    id: 2,
    name: "Olivier Holme",
    email: "oholme1@huffingtonpost.com",
    password: "jB8/@&9<$<IN(OWI",
    role: "reader",
  },
  {
    id: 3,
    name: "Alyssa Benley",
    email: "abenley2@nydailynews.com",
    password: "jR9<!9mt3kn",
    role: "writer",
  },
  {
    id: 4,
    name: "Arin Dunphie",
    email: "adunphie3@army.mil",
    password: "sB7$jFa'+$w,5{O'",
    role: "admin",
  },
  {
    id: 5,
    name: "Ruggiero Surpliss",
    email: "rsurpliss4@constantcontact.com",
    password: "rM0<TEqZX(",
    role: "writer",
  },
];

export const UserList: React.FC = () => {
  return (
    <Space direction="vertical" size={24} className={s.userList}>
      {mockUsers.map((user) => (
        <User key={user.id} {...user} />
      ))}
    </Space>
  );
};

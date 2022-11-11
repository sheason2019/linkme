import { Outlet, useParams } from "react-router-dom";
import LinkmeAppBar from "../../common/components/linkme-app-bar";

const AccountPage = () => {
  const {} = useParams();

  return (
    <>
      <LinkmeAppBar />
      <Outlet />
    </>
  );
};

export default AccountPage;

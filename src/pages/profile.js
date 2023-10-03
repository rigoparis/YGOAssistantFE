import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  return (
    <div>
      {isLoggedIn && (
        <div>
          You&#39;re logged in now <br />
          {user.username}
        </div>
      )}
      {!isLoggedIn && (
        <div>
          Not logged in, go back to log in <br />
          <a href="/login">Log in</a>
        </div>
      )}
    </div>
  );
}

export default Profile;

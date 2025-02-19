import { useContext, useState, useRef } from "react";
import { ShopContext } from "../../Context";
import { Layout } from "../../Components/Layout";

export const MyAccount = () => {
  // Access global context to update account information
  const { setAccount } = useContext(ShopContext);

  // State to determine whether to show user info or edit form
  const [view, setView] = useState("user-info");

  // Retrieve account data from localStorage
  const account = localStorage.getItem("account");
  const parsedAccount = JSON.parse(account);

  // Reference for the edit form
  const form = useRef(null);

  /**
   * Handles account editing and updates localStorage & global state
   */
  const editAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      lastName: formData.get("last-name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    // Update account in localStorage
    const stringifiedAccount = JSON.stringify(data);
    localStorage.setItem("account", stringifiedAccount);
    setAccount(data); // Update global state
  };

  /**
   * Renders the user's account information with an option to edit
   */
  const renderUserInfo = () => {
    return (
      <div className="flex flex-col w-80">
        <p>
          <span className="font-light text-sm">Name: </span>
          <span>{parsedAccount?.name}</span>
        </p>
        <p>
          <span className="font-light text-sm">Last Name: </span>
          <span>{parsedAccount?.lastName}</span>
        </p>
        <p>
          <span className="font-light text-sm">Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <button
          className="border border-black rounded-lg mt-6 py-3"
          onClick={() => setView("edit-user-info")}
        >
          Edit
        </button>
      </div>
    );
  };

  /**
   * Renders the edit form allowing the user to update their information
   */
  const renderEditUserInfo = () => {
    return (
      <form ref={form} className="flex flex-col gap-4 w-80">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-light text-sm">
            Your name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount.name}
            placeholder="Peter"
            className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="last-name" className="font-light text-sm">
            Your last name:
          </label>
          <input
            type="text"
            id="last-name"
            name="last-name"
            defaultValue={parsedAccount.lastName}
            placeholder="last amen"
            className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-light text-sm">
            Your email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={parsedAccount.email}
            placeholder="hi@helloworld.com"
            className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-light text-sm">
            Your password:
          </label>
          <input
            type="text"
            id="password"
            name="password"
            defaultValue={parsedAccount.password}
            placeholder="******"
            className="rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
        <button
          className="bg-black text-white w-full rounded-lg py-3"
          onClick={() => {
            setView("user-info"), editAccount();
          }}
        >
          Edit
        </button>
      </form>
    );
  };

  // Conditionally render either the user info or the edit form
  const renderView = () =>
    view === "edit-user-info" ? renderEditUserInfo() : renderUserInfo();

  return (
    <Layout>
      <h1 className="font-medium text-xl text-center mb-6 w-80">My account</h1>
      {renderView()}
    </Layout>
  );
};

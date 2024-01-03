import React, { useState, useRef, useEffect } from "react";
import Input from "@material-tailwind/react/Input";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const eye = <FontAwesomeIcon icon={faEye} color="gray" />;
import { useForm, Controller } from "react-hook-form";
import Auth from "../../redux/actions/auth/Auth";
import msg from "../../redux/actions/message/Message";

export const Register = ({ history }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const [passwordShown, setPasswordShown] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = (data, e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(Auth.register(data))
      .then(() => {
        history.replace("/");
        // window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(msg.setMessageInfo(`Vous disposez deja d'un compte !!!`));
      return history.goBack();
    }
  }, []);

  return (
    <>
      <div className="bg-white w-full h-auto flex lg:items-center lg:space-x-8 justify-center text-gray-800 pb-48 lg:pb-8 xl:pb-16 lg:pt-16  ">
        <form
          className=" hidden lg:flex w-2/5 bg-white   space-y-5 flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-2xl font-semibold text-yellow-400">
            Créer un compte
          </div>
          <div className="flex space-x-8">
            <Controller
              control={control}
              defaultValues=""
              name="first_name"
              rules={{
                required: "Le Nom est obligatoire",
                minLength: {
                  value: 3,
                  message: "Le Nom doit contenir au moins 3 caractères",
                },
              }}
              render={({ field: { onChange } }) => (
                <FormInput
                  onChange={onChange}
                  placeholder="Nom"
                  error={errors.first_name?.message}
                />
              )}
            />
            <Controller
              control={control}
              defaultValues=""
              name="last_name"
              rules={{
                required: "Le Prenom est obligatoire",
                minLength: {
                  value: 3,
                  message: "Le Prenom doit contenir au moins 3 caractères",
                },
              }}
              render={({ field: { onChange } }) => (
                <FormInput
                  onChange={onChange}
                  placeholder="Prenom"
                  error={errors.last_name?.message}
                />
              )}
            />
          </div>
          <div className="flex space-x-8">
            <Controller
              control={control}
              defaultValues=""
              name="phone"
              rules={{
                required: "Le Numéro de Téléphone est obligatoire",
                minLength: {
                  value: 9,
                  message:
                    "Le Numéro de Téléphone doit contenir au moins 9 caractères",
                },
                maxLength: {
                  value: 9,
                  message:
                    "Le Numéro de Téléphone ne doit pas excéder 9 caractères",
                },
                pattern: {
                  value: /[26]{1}[0-9]{8}/,
                  message:
                    "La valeur saisie ne correspond pas au format du numero de téléphone",
                },
              }}
              render={({ field: { onChange } }) => (
                <FormInput
                  onChange={onChange}
                  type="tel"
                  placeholder="Téléphone"
                  error={errors.phone?.message}
                />
              )}
            />
            <Controller
              control={control}
              defaultValues=""
              name="city"
              rules={{
                required: "La Ville est obligatoire",
                minLength: {
                  value: 4,
                  message: "La ville doit contenir au moins 4 caractères",
                },
              }}
              render={({ field: { onChange } }) => (
                <FormInput
                  onChange={onChange}
                  type="text"
                  placeholder="Ville"
                  error={errors.city?.message}
                />
              )}
            />
          </div>{" "}
          <div className="">
            <Controller
              control={control}
              defaultValues=""
              name="email"
              rules={{
                required: "L'email est obligatoire",
                minLength: {
                  value: 4,
                  message: "L'email doit contenir au moins 4 caractères",
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message:
                    "La valeur saisie ne correspond pas au format de l'email",
                },
              }}
              render={({ field: { onChange } }) => (
                <FormInput
                  onChange={onChange}
                  type="email"
                  placeholder="Email"
                  error={errors.email?.message}
                />
              )}
            />
          </div>
          <div className="flex space-x-8 w-full">
            <div className="flex w-2/3">
              <Controller
                control={control}
                defaultValues=""
                name="password"
                rules={{
                  required: "Le Mot de passe est obligatoire",
                  minLength: {
                    value: 8,
                    message:
                      "Le mot de passe doit contenir au moins 8 caractères",
                  },
                }}
                render={({ field: { onChange } }) => (
                  <FormInput
                    onChange={onChange}
                    type={passwordShown ? "text" : "password"}
                    placeholder="Mot de passe"
                    error={errors.password?.message}
                  />
                )}
              />
              <i onClick={togglePasswordVisiblity} className="mt-2">
                {eye}
              </i>
            </div>
            <div className="flex w-2/3">
              <Controller
                control={control}
                defaultValues=""
                name="c_password"
                rules={{
                  // required: "Confirmez le mot de passe",
                  validate: (value) =>
                    value === password.current ||
                    "Le mot de passe ne correspond pas",
                }}
                render={({ field: { onChange } }) => (
                  <FormInput
                    onChange={onChange}
                    type="password"
                    placeholder="Confirmez le mot de passe"
                    error={errors.c_password?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className="">
            <button
              disabled={loading}
              type="submit"
              className="flex w-full mt-5 border-2 space-x-3  bg-yellow-300 rounded-md  text-white  justify-center items-center p-1   hover:bg-yellow-500 hover:border-yellow-500 transition duration-300 ease-in-out focus-within:outline-none "
            >
              <span className="text-sm font-medium">
                {!loading && "S'inscrire"}
                {loading && "Loading..."}
              </span>
            </button>
          </div>
          <div className="flex justify-center lg:-mt-10 ">
            <div className="flex space-x-4">
              <p className="text-xm text-blue-500">
                Vous avez deja un Compte ?
              </p>{" "}
              <Link
                to="/account/login"
                className="text-sm text-yellow-300 hover:text-yellow-500 transition duration-200 ease-in-out  transform hover:-translate-x-1 hover:-translate-y-2 hover:scale-110 "
              >
                {" "}
                Connectez vous
              </Link>
            </div>
          </div>
        </form>
        <form
          className="lg:hidden  w-4/6 bg-white h-auto mt-20  space-y-5 flex-col "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="text-xl font-semibold text-yellow-400">
            Créer un compte
          </div>
          <div className="flex flex-col space-y-5">
            <Controller
              control={control}
              defaultValues=""
              name="first_name"
              rules={{
                required: "Le Nom est obligatoire",
                minLength: {
                  value: 3,
                  message: "Le Nom doit contenir au moins 3 caractères",
                },
              }}
              render={({ field: { onChange } }) => (
                <FormInput
                  onChange={onChange}
                  placeholder="Nom"
                  error={errors.first_name?.message}
                />
              )}
            />
            <Controller
              control={control}
              defaultValues=""
              name="last_name"
              rules={{
                required: "Le Prenom est obligatoire",
                minLength: {
                  value: 3,
                  message: "Le Prenom doit contenir au moins 3 caractères",
                },
              }}
              render={({ field: { onChange } }) => (
                <FormInput
                  onChange={onChange}
                  placeholder="Prenom"
                  error={errors.last_name?.message}
                />
              )}
            />
          </div>
          <div className="flex flex-col space-y-5 ">
            <Controller
              control={control}
              defaultValues=""
              name="phone"
              rules={{
                required: "Le Numéro de Téléphone est obligatoire",
                minLength: {
                  value: 9,
                  message:
                    "Le Numéro de Téléphone doit contenir au moins 9 caractères",
                },
                maxLength: {
                  value: 9,
                  message:
                    "Le Numéro de Téléphone ne doit pas excéder 9 caractères",
                },
                pattern: {
                  value: /[26]{1}[0-9]{8}/,
                  message:
                    "La valeur saisie ne correspond pas au format du numero de téléphone",
                },
              }}
              render={({ field: { onChange } }) => (
                <FormInput
                  onChange={onChange}
                  type="tel"
                  placeholder="Téléphone"
                  error={errors.phone?.message}
                />
              )}
            />
            <Controller
              control={control}
              defaultValues=""
              name="city"
              rules={{
                required: "La Ville est obligatoire",
                minLength: {
                  value: 4,
                  message: "La ville doit contenir au moins 4 caractères",
                },
              }}
              render={({ field: { onChange } }) => (
                <FormInput
                  onChange={onChange}
                  type="text"
                  placeholder="Ville"
                  error={errors.city?.message}
                />
              )}
            />
          </div>{" "}
          <div className=" space-y-5">
            <Controller
              control={control}
              defaultValues=""
              name="email"
              rules={{
                required: "L'email est obligatoire",
                minLength: {
                  value: 4,
                  message: "L'email doit contenir au moins 4 caractères",
                },
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message:
                    "La valeur saisie ne correspond pas au format de l'email",
                },
              }}
              render={({ field: { onChange } }) => (
                <FormInput
                  onChange={onChange}
                  type="email"
                  placeholder="Email"
                  error={errors.email?.message}
                />
              )}
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex  ">
              <Controller
                control={control}
                defaultValues=""
                name="password"
                rules={{
                  required: "Le Mot de passe est obligatoire",
                  minLength: {
                    value: 8,
                    message:
                      "Le mot de passe doit contenir au moins 8 caractères",
                  },
                }}
                render={({ field: { onChange } }) => (
                  <FormInput
                    onChange={onChange}
                    type={passwordShown ? "text" : "password"}
                    placeholder="Mot de passe"
                    error={errors.password?.message}
                  />
                )}
              />
              <i onClick={togglePasswordVisiblity} className="mt-2">
                {eye}
              </i>
            </div>
            <div className="flex w-2/3">
              <Controller
                control={control}
                defaultValues=""
                name="c_password"
                rules={{
                  // required: "Confirmez le mot de passe",
                  validate: (value) =>
                    value === password.current ||
                    "Le mot de passe ne correspond pas",
                }}
                render={({ field: { onChange } }) => (
                  <FormInput
                    onChange={onChange}
                    type="password"
                    placeholder="Confirmez le mot de passe"
                    error={errors.c_password?.message}
                  />
                )}
              />
            </div>
          </div>
          <div className="">
            <button
              disabled={loading}
              type="submit"
              className="flex w-full mt-5 border-2 space-x-3  bg-yellow-300 rounded-md  text-white  justify-center items-center p-1   hover:bg-yellow-500 hover:border-yellow-500 transition duration-300 ease-in-out focus-within:outline-none "
            >
              <span className="text-sm font-medium">
                {!loading && "S'inscrire"}
                {loading && "Loading..."}
              </span>
            </button>
          </div>
          <div className="flex justify-center lg:-mt-10 ">
            <div className="flex space-x-4">
              <p className="text-xs text-blue-500">
                Vous avez deja un Compte ?
              </p>{" "}
              <Link
                to="/account/login"
                className="text-xs text-yellow-300 hover:text-yellow-500 transition duration-200 ease-in-out  transform hover:-translate-x-1 hover:-translate-y-2 hover:scale-110 "
              >
                {" "}
                Connectez vous
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
const FormInput = ({
  onChange,
  type = "type",
  color = "amber",
  placeholder,
  error = "",
}) => (
  <Input
    onChange={onChange}
    type={type}
    color={color}
    size="sm"
    outline={false}
    placeholder={placeholder}
    error={error}
  />
);

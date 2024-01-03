import React, { Fragment, useEffect, useRef, useCallback, useState } from "react"
import Input from "@material-tailwind/react/Input";
import { useParams } from "react-router-dom"
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'
import { useForm, Controller } from "react-hook-form";
import CustomerService from "../../Services/Customer"
import msg from "../../redux/actions/message/Message";
import { useDispatch } from "react-redux";

const roles = [
  	{
    id: 1,
    name: 'guest',
    },
  	{
    id: 2,
    name: 'seller',
    },
  	{
    id: 3,
    name: 'admin',
	},
]

const cities = [
  	{
    id: 1,
    name: 'Yaounde',
    },
  	{
    id: 2,
    name: 'Douala',
    },
  	{
    id: 3,
    name: 'Bafoussam',
	},
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const AddCustomers = ({ history }) =>{
	const [loading, setLoading] = useState(false)
	const [selectedRole, setSelectedRole] = useState()
	const [selectedCity, setSelectedCity] = useState()
	const [user, setUser] = useState(null)

    const { id } = useParams('id')
    const dispatch = useDispatch()

    const {
        getValues,
        setValue,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const password = useRef({});
    password.current = watch("password", "");

	const onSubmit = async(data, e) => {
		e.preventDefault()
		const mergedData = Object.assign(user, data)
		setLoading(true)
        if (typeof id === "undefined") {
            try
            {
                const { message } = await CustomerService.Add(mergedData)
                setLoading(false)
                dispatch(msg.setMessageSuccess(message))
                history.push("/admin/customers")
            }catch({response}){
                setLoading(false)
                dispatch(msg.setMessageError(response.data.message))
            }    
        }else{
            try
            {
                const { message } = await CustomerService.Update(id, mergedData)
                setLoading(false)
                dispatch(msg.setMessageSuccess(message))
                history.push("/admin/customers")
            }catch({response}){
                setLoading(false)
                dispatch(msg.setMessageError(response.data.message))
            } 
        }
		
    };

	const handleChange = ({target}) => {
		const { name, value } = target
		setUser({...user, [name]:value})
    };

    const completUserProperty = useCallback(() => {
    	setUser({...user, role: selectedRole?.name, city: selectedCity?.name})
    }, [selectedRole, setSelectedCity])

    const fetchUserData = useCallback( async() => {
        if (typeof id !== "undefined") {
            try{
                const { data } = await CustomerService.Get(id)
                setValue('first_name', data["nom"])
                setValue('last_name', data["prenom"])
                setValue('phone', data["tel"])
                setValue('cni', data["cni"])
                setValue('adresse', data["adresse"])
                setValue('email', data["email"])
                setSelectedRole(roles[roles.filter((role) => role.name === data.role.role)[0].id - 1])
                setSelectedCity(cities[cities.filter((city) => city.name.toLowerCase() === data["ville"].toLowerCase())[0].id -1])
            }catch({response}){
                console.log(response)
            }
        }
    },[id])

    useEffect(() => {
        fetchUserData()
    },[id])

    useEffect(() => {
    	completUserProperty()
    }, [selectedRole, setSelectedCity])

	return (
		<div className="bg-white w-full shadow-md rounded-md py-10 ">
            <div className="h-10 border-b border-gray-400 border-opacity-50 flex flex-col justify-center items-center ">
                <label className="text-gray-500 ml-2 flex ">
                    Ajouter un Client
                </label>
            </div>
            <form className=" flex mt-4 space-x-2 mx-2" onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full px-3 space-y-3 flex flex-col mx-10">
                    <div className="flex justify-between space-x-4 mt-4">
                    	<Controller
                            control={control}
                            defaultValues=""
                            name="first_name"
                            rules={{
                                required: "Le nom est obligatoire",
                                minLength: {
                                    value: 3,
                                    message:
                                        "Le Nom doit contenir au moins 3 caractères",
                                },
                            }}
                            render={({ field: { onChange } }) => (
                            	<Input
			                        type="text"
			                        color="deepPurple"
			                        size="sm"
			                        outline={true}
			                        name="first_name"
			                        placeholder="Nom"
                                    value={getValues("first_name") ?? ""}
			                        onChange={onChange}
			                        error={errors.first_name?.message}
			                    />
                            )}
                        />
                        <Controller
                            control={control}
                            defaultValues=""
                            name="last_name"
                            rules={{
                                required: "Le prenom est obligatoire",
                                minLength: {
                                    value: 3,
                                    message:
                                        "Le prenom doit contenir au moins 3 caractères",
                                },
                            }}
                            render={({ field: { onChange } }) => (
                            	<Input
			                        type="text"
			                        color="deepPurple"
			                        size="sm"
			                        outline={true}
			                        name="last_name"
			                        placeholder="Prenom"
                                    value={getValues("last_name") ?? ""}
			                        onChange={onChange}
			                        error={errors.last_name?.message}
			                    />
                            )}
                        />
                    </div>
                    <div className="flex items-center space-x-4 pt-4">
                    	<Controller
                            control={control}
                            defaultValues=""
                            name="adresse"
                            rules={{
                                required: "L'adresse est obligatoire",
                                minLength: {
                                    value: 3,
                                    message:
                                        "L'adresse doit contenir au moins 3 caractères",
                                },
                            }}
                            render={({ field: { onChange } }) => (
                            	<Input
			                        type="text"
			                        color="deepPurple"
			                        size="sm"
			                        outline={true}
			                        name="adresse"
			                        placeholder="adresse"
                                    value={getValues("adresse") ?? ""}
			                        onChange={onChange}
			                        error={errors.adresse?.message}
			                    />
                            )}
                        />
	                    <div className="w-4/4 space-x-2 flex items-center">
	                    	<Select
		                        label="Ville"
		                        selected={selectedCity}
		                        setSelected={setSelectedCity}
		                        data={cities}
		                    />
	                    </div>
                    </div>
                    <div className="flex justify-between space-x-4 pt-4">
                    	<Controller
                            control={control}
                            defaultValues=""
                            name="phone"
                            rules={{
                                required:
                                    "Le numéro de Téléphone est obligatoire",
                                minLength: {
                                    value: 9,
                                    message:
                                        "Le numéro de Téléphone doit contenir 9 caractères",
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
                            	<Input
			                        type="text"
			                        color="deepPurple"
			                        size="sm"
			                        outline={true}
			                        name="phone"
			                        placeholder="Telephone"
                                    value={getValues("phone") ?? ""}
			                        onChange={onChange}
			                        error={errors.phone?.message}
			                    />
                            )}
                        />
                        <Controller
                            control={control}
                            defaultValues=""
                            name="cni"
                            rules={{
                                required: "Vous devez fournir le numero de la CNI",
                                minLength: {
                                    value: 9,
                                    message:
                                        "Le numéro de la CNI doit avoir 9 caractères",
                                },
                                maxLength: {
                                    value: 9,
                                    message:
                                        "Le numéro de la CNI ne peut avoir plus de 9 caractères",
                                },
                            }}
                            render={({ field: { onChange } }) => (
                            	<Input
			                        type="number"
			                        color="deepPurple"
			                        size="sm"
			                        outline={true}
			                        name="cni"
                                    value={getValues("cni") ?? ""}
			                        placeholder="CNI"
			                        onChange={onChange}
			                        error={errors.cni?.message}
			                    />
                            )}
                        />
                    </div>
                    <div className="pt-4">
                    	<Controller
                            control={control}
                            defaultValues=""
                            name="email"
                            rules={{
                                required: "L'email est obligatoire",
                                pattern: {
                                    value: /\S+@\S+\.\S+/,
                                    message:
                                        "La valeur saisie ne correspond pas au format de l'email",
                                },
                            }}
                            render={({ field: { onChange } }) => (
                                <Input
			                        type="email"
			                        color="deepPurple"
			                        size="sm"
			                        outline={true}
			                        name="email"
                                    value={getValues("email") ?? ""}
			                        placeholder="E-mail"
			                        onChange={onChange}
			                        error={errors.email?.message}
			                    />
                            )}
                        />
                    	
                    </div>

                    {typeof id === "undefined" && 
                        <div className="flex justify-between space-x-4 pt-4">
                            <Controller
                                    control={control}
                                    defaultValues=""
                                    name="password"
                                    rules={{
                                        required: "Le mot de passe est obligatoire",
                                        minLength: {
                                            value: 8,
                                            message:
                                                "Le mot de passe doit contenir au moins 8 caractères",
                                        },
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <Input
                                            type="password"
                                            color="deepPurple"
                                            size="sm"
                                            outline={true}
                                            name="password"
                                            placeholder="Password"
                                            onChange={onChange}
                                            error={errors.password?.message}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    defaultValues=""
                                    name="c_password"
                                    rules={{
                                        required: "Confirmez le mot de passe",
                                        validate: (value) =>
                                            value === password.current ||
                                            "Le mot de passe ne correspond pas",
                                    }}
                                    render={({ field: { onChange } }) => (
                                        <Input
                                            type="password"
                                            color="deepPurple"
                                            size="sm"
                                            outline={true}
                                            name="c_password"
                                            placeholder="Confirmez password"
                                            onChange={onChange}
                                            error={errors.c_password?.message}
                                        />
                                    )}
                                />
                        </div>
                    }
            		
            		<div className="pt-4">
                    	<Select
	                        label="Role"
	                        selected={selectedRole}
	                        setSelected={setSelectedRole}
	                        data={roles}
	                    />
                    </div>
                    <div className="mt-4">
					  <span className="text-gray-700">Sexe</span>
					  <div className="mt-2">
					    <label className="inline-flex items-center">
					      <input type="radio" className="form-radio" name="sexe" value="m" onChange={handleChange}/>
					      <span className="ml-2">Masculin</span>
					    </label>
					    <label className="inline-flex items-center ml-6">
					      <input type="radio" className="form-radio" name="sexe" value="f" onChange={handleChange}/>
					      <span className="ml-2">Feminin</span>
					    </label>
					  </div>
					</div>
                    <button
                        type="submit"
                        className="flex w-full my-5  space-x-3 text-sm font-medium bg-blue-600 rounded-md  text-white  justify-center items-center p-1   hover:bg-blue-800  transition duration-300 ease-in-out focus-within:outline-none py-2 "
                    >
                        {loading && "Loading..."}
                        {!loading && "Enregistrez"}
                    </button>
                </div>
            </form>
        </div>
	);
}

const Select = ({selected, setSelected, data, label}) =>{
	return (
		<Listbox value={selected} onChange={setSelected}>
	      {({ open }) => (
	        <>
	          <Listbox.Label className="block text-sm font-medium text-gray-700">{label}</Listbox.Label>
	          <div className="mt-1 relative">
	            <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
	              <span className="flex items-center">
	                <span className="ml-3 block truncate">{selected?.name}</span>
	              </span>
	              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
	                <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
	              </span>
	            </Listbox.Button>

	            <Transition
	              show={open}
	              as={Fragment}
	              leave="transition ease-in duration-100"
	              leaveFrom="opacity-100"
	              leaveTo="opacity-0"
	            >
	              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
	                {data.map((item) => (
	                  <Listbox.Option
	                    key={item.id}
	                    className={({ active }) =>
	                      classNames(
	                        active ? 'text-white bg-indigo-600' : 'text-gray-900',
	                        'cursor-default select-none relative py-2 pl-3 pr-9'
	                      )
	                    }
	                    value={item}
	                  >
	                    {({ selected, active }) => (
	                      <>
	                        <div className="flex items-center">
	                          <span
	                            className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
	                          >
	                            {item.name}
	                          </span>
	                        </div>

	                        {selected ? (
	                          <span
	                            className={classNames(
	                              active ? 'text-white' : 'text-indigo-600',
	                              'absolute inset-y-0 right-0 flex items-center pr-4'
	                            )}
	                          >
	                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
	                          </span>
	                        ) : null}
	                      </>
	                    )}
	                  </Listbox.Option>
	                ))}
	              </Listbox.Options>
	            </Transition>
	          </div>
	        </>
	      )}
	    </Listbox>
	)
}
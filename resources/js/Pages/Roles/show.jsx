import Checkbox from "@/Components/Checkbox";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";

export default function Show(props) {
    if (!props.auth.availableRoutes.some((i) => i.moduleName == "roles")) {
        router.get("/");
    }

    const { role, permissions, users } = props.data;

    console.log(props);

    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={
                <h2 className="capitalize font-semibold text-xl text-gray-800 leading-tight">
                    {role.roleName}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-4">
                        <Link href="/roles">
                            <svg
                                className="w-10 h-10 ml-4 mt-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g
                                    id="SVGRepo_tracerCarrier"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M6 12H18M6 12L11 7M6 12L11 17"
                                        stroke="#000000"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    ></path>
                                </g>
                            </svg>
                        </Link>
                        {permissions ? (
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Modulo
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Crear
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Leer
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Actualizar
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Borrar
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3"
                                        ></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {permissions.map((i) => (
                                        <tr
                                            key={i.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <td
                                                scope="row"
                                                className="px-6 py-4 font-medium capitalize text-gray-900 wditespace-nowrap dark:text-white"
                                            >
                                                {i.moduleName}
                                            </td>
                                            <td
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                <Checkbox
                                                    defaultChecked={i.canCreate}
                                                />
                                            </td>
                                            <td
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                <Checkbox
                                                    defaultChecked={i.canCreate}
                                                />
                                            </td>
                                            <td
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                <Checkbox
                                                    defaultChecked={i.canCreate}
                                                />
                                            </td>
                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                <Checkbox
                                                    defaultChecked={i.canCreate}
                                                />
                                            </th>
                                            {props.auth.permissionsInRoute.some(
                                                (i) => i.canDelete == 1
                                            ) && (
                                                <td className="px-6 py-4 text-right">
                                                    <a
                                                        href="#"
                                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                                    >
                                                        Borrar
                                                    </a>
                                                </td>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <h3>No hay Permisos</h3>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

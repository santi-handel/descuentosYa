import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";

function DeleteRoleForm({ id, roleName }) {
    const [confirmingRoleDeletion, setConfirmingRoleDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        roleName: "",
        id: id,
    });

    const confirmRoleDeletion = () => {
        setConfirmingRoleDeletion(true);
    };

    const deleteRole = (e) => {
        e.preventDefault();

        destroy(
            route("roles.destroy", {
                id: id,
                roleName: data.roleName,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    closeModal();
                    router.reload();
                },
                onError: () => passwordInput.current.focus(),
                onFinish: () => reset(),
            }
        );
    };

    const closeModal = () => {
        setConfirmingRoleDeletion(false);

        reset();
    };

    return (
        <>
            <DangerButton onClick={confirmRoleDeletion}>Borrar</DangerButton>

            <Modal show={confirmingRoleDeletion} onClose={closeModal}>
                <form onSubmit={deleteRole} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        ¿Estas seguro de borrar el Rol {roleName}?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Una vez que se elimine el rol, todos sus recursos y
                        datos serán eliminados permanentemente. Por favor,
                        ingrese el nombre para confirmar que desea eliminar el
                        rol de forma permanente.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="roleName"
                            value="roleName"
                            className="sr-only"
                        />

                        <TextInput
                            id="roleName"
                            type="roleName"
                            name="roleName"
                            ref={passwordInput}
                            value={data.roleName}
                            onChange={(e) =>
                                setData("roleName", e.target.value)
                            }
                            className="mt-1 block w-3/4 p-2"
                            isFocused
                            placeholder="Nombre del Rol"
                        />

                        <InputError
                            message={errors.roleName}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>

                        <DangerButton className="ml-3" disabled={processing}>
                            Borrar Rol
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </>
    );
}

export default DeleteRoleForm;

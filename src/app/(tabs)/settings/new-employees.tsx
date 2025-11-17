import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Text, TextInput, View } from "react-native";
import { z } from 'zod';

export const newEmployeesSchema = z.object({
    name: z.string().min(1, 'Campo obrigatório!'),
    licensePlate: z.string().optional()
})

type NewEmployee = z.infer<typeof newEmployeesSchema>

export default function NewEmployees() {

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<NewEmployee>({
        resolver: zodResolver(newEmployeesSchema)
    })

    const [addedEmployees, setAddedEmployees] = useState<NewEmployee[]>([])

    const onSubmit = (data: NewEmployee) => {
        setAddedEmployees(prev => [...prev, data])
        reset()
    }

    return (
        <View className="flex-1 p-4">
            <View className="gap-4">
                <View>
                    <Text>Nome</Text>
                    <Controller 
                        control={control}
                        render={({ field }) => (
                            <TextInput 
                                placeholder="Nome do colaborador"
                                onBlur={field.onBlur}
                                onChangeText={field.onChange}
                                value={field.value}
                            />
                        )}
                        name="name"
                    />
                    {errors.name && <Text>Campo obrigatório!</Text>}
                </View>
                <View>
                    <Text>Placa</Text>
                    <Controller 
                        control={control}
                        render={({ field }) => (
                            <TextInput 
                                placeholder="Placa do veículo"
                                onBlur={field.onBlur}
                                onChangeText={field.onChange}
                                value={field.value}
                            />
                        )}
                        name="licensePlate"
                    />
                    {errors.name && <Text>Campo obrigatório!</Text>}
                </View>
                <Button 
                    title="Adicionar colaborador"
                    onPress={handleSubmit(onSubmit)}
                />
                {addedEmployees.map(employee => (
                    <Text key={employee.name}>{employee.name}</Text>
                ))}
            </View>
        </View>
    )
}
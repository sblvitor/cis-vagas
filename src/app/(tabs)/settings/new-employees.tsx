import { api } from "@/convex/_generated/api";
import Ionicons from "@expo/vector-icons/Ionicons";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlashList } from "@shopify/flash-list";
import { useMutation } from "convex/react";
import { useRouter } from "expo-router";
import { Button, Card, Spinner, TextField, useThemeColor } from "heroui-native";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { FadeIn, LinearTransition } from "react-native-reanimated";
import { withUniwind } from 'uniwind';
import { z } from 'zod';

export const newEmployeesSchema = z.object({
    name: z.string().min(1, 'Campo obrigatório!'),
    licensePlate: z.string().optional()
})

type NewEmployee = z.infer<typeof newEmployeesSchema>

const StyledIonicons = withUniwind(Ionicons)

export default function NewEmployees() {

    const {
        control,
        handleSubmit,
        reset
    } = useForm<NewEmployee>({
        resolver: zodResolver(newEmployeesSchema),
        defaultValues: {
            name: '',
            licensePlate: ''
        }
    })

    const [addedEmployees, setAddedEmployees] = useState<NewEmployee[]>([])

    
    const onSubmit = (data: NewEmployee) => {
        setAddedEmployees(prev => [data, ...prev])
        reset()
    }

    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const addEmployees = useMutation(api.employees.addEmployees)

    const handleSaveToBackend = () => {
        setIsLoading(true)
        addEmployees({employees: addedEmployees})
            .catch((error) => console.error(error))
            .then(() => router.back()) // TODO add toast
            .finally(() =>  setIsLoading(false))
    }

    const themeColorAccentForeground = useThemeColor('accent-foreground');

    return (
        <View className="flex-1 p-4">
            <View className="gap-4 flex-1">
                <Controller 
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField isInvalid={fieldState.invalid} isRequired={true}>
                            <TextField.Label>Nome</TextField.Label>
                            <TextField.Input 
                                placeholder="Nome do colaborador"
                                onBlur={field.onBlur}
                                onChangeText={field.onChange}
                                value={field.value}
                            />
                            <TextField.ErrorMessage>{fieldState.error?.message}</TextField.ErrorMessage>
                        </TextField>
                    )}
                    name="name"
                />
                <Controller 
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextField isInvalid={fieldState.invalid}>
                            <TextField.Label>Placa</TextField.Label>
                            <TextField.Input 
                                placeholder="Placa do veículo"
                                onBlur={field.onBlur}
                                onChangeText={field.onChange}
                                value={field.value}
                            />
                            <TextField.ErrorMessage>{fieldState.error?.message}</TextField.ErrorMessage>
                        </TextField>
                    )}
                    name="licensePlate"
                />
                <Button onPress={handleSubmit(onSubmit)}>
                    <StyledIonicons name="add" size={18} className="text-accent-foreground" />
                    Adicionar colaborador
                </Button>
                <View className="flex-1">
                    <FlashList 
                        data={addedEmployees}
                        renderItem={({ item }) => <EmployeeItem employee={item} onRemove={(employeeToRemove) => {
                            setAddedEmployees(prev => prev.filter(emp => emp !== employeeToRemove))
                        }} />}
                        ItemSeparatorComponent={() => <View className="h-4" />}
                    />
                </View>
                <View className="border-t border-gray-200 pt-2 items-center">
                    <Button 
                        layout={LinearTransition.springify()}
                        className="w-full"
                        onPress={handleSaveToBackend}
                        isDisabled={addedEmployees.length === 0 || isLoading}
                        isIconOnly={isLoading}
                    >
                        {isLoading ? <Spinner entering={FadeIn.delay(50)} color={themeColorAccentForeground} /> : 'Salvar colaboradores'}
                    </Button>
                </View>
            </View>
        </View>
    )
}

const EmployeeItem = ({ employee, onRemove }: { employee: NewEmployee, onRemove: (employee: NewEmployee) => void }) => {
    return (
        <Card>
            <Card.Body className="flex-row justify-between items-center">
                <View>
                    <Card.Title>{employee.name}</Card.Title>
                    {employee.licensePlate && <Card.Description>{employee.licensePlate}</Card.Description>}
                </View>
                <Button variant="ghost" isIconOnly onPress={() => onRemove(employee)}>
                    <StyledIonicons name="trash" size={18} className="text-accent-foreground" />
                </Button>
            </Card.Body>
        </Card>
    )
}
import { Stack } from "expo-router";

export default function SettingsLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Configurações' }} />
            <Stack.Screen name="manage-employees" options={{ title: 'Gerenciar colaboradores' }} />
            <Stack.Screen name="new-employees" options={{ presentation: 'modal', title: 'Adicionar colaboradores' }} />
        </Stack>
    )
}
import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from "expo-router";

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen name="index" options={{ title: 'Vagas do dia' }} />
            <Tabs.Screen name="eCalendar" options={{ title: 'Calendário' }} />
            <Tabs.Screen name="employees" options={{ title: 'Colaboradores' }} />
            <Tabs.Screen 
                name="settings" 
                options={{ 
                    title: 'Configurações', 
                    headerShown: false,
                    tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />
                }} 
            />
        </Tabs>
    )
}
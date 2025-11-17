import { FloatingActionButton } from "@/src/components/ui/fab";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function ManageUsers() {
    return (
        <View className="flex-1 p-4">
            <Text>Gerenciamento de usuários</Text>
            <Link href={'/(tabs)/settings/new-employees'} asChild>
                <FloatingActionButton />
            </Link>
        </View>
    )
}
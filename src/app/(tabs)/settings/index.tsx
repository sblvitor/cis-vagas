import { Link } from "expo-router";
import { Button } from "heroui-native";
import { View } from "react-native";

export default function Config() {
    return (
        <View className="p-4 flex-1 gap-4">
            <Link href={'/(tabs)/settings/manage-employees'} asChild>
                <Button variant="tertiary">
                    Gerenciar colaboradores
                </Button>
            </Link>
        </View>
    )
}
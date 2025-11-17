import { Link } from "expo-router";
import { Button, View } from "react-native";

export default function Config() {
    return (
        <View className="p-4">
            <Link href={'/(tabs)/settings/manage-employees'} asChild>
                <Button 
                    title="Gerenciar colaboradores"
                />
            </Link>
        </View>
    )
}
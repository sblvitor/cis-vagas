import { Link } from "expo-router";
import { Button, View } from "react-native";

export default function Config() {
    return (
        <View className="p-4">
            <Link href={'/(tabs)/settings/manage-users'} asChild>
                {/* <Pressable>
                    <Text>Gerenciar usuários</Text>
                </Pressable> */}
                <Button 
                    title="Gerenciar usuários"
                />
            </Link>
        </View>
    )
}
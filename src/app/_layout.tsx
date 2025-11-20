import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { Stack } from "expo-router";
import { HeroUINativeProvider } from 'heroui-native';
import '../global.css';

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
    unsavedChangesWarning: false,
})

export default function RootLayout() {
    return (
        <ConvexProvider client={convex}>
            <HeroUINativeProvider>
                <Stack>
                    <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                </Stack>
            </HeroUINativeProvider>
        </ConvexProvider>
    ) 
}

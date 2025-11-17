import Ionicons from "@expo/vector-icons/Ionicons"
import { Pressable } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"

type FloatingActionButtonProps = {
    onPress?: () => void
}

export const FloatingActionButton = ({ onPress }: FloatingActionButtonProps) => {

    const scale = useSharedValue(1);

    const handlePressIn = () => {
        scale.value = withSpring(0.9, {
            stiffness: 300,
            damping: 20,
        });
    };
    
      const handlePressOut = () => {
        scale.value = withSpring(1, {
            stiffness: 300,
            damping: 20,
        });
    };

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <Animated.View 
            className={'absolute bottom-8 right-8'}
            style={animatedStyle}
        >
            <Pressable
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                className="bg-[#2b8cee] w-14 h-14 rounded-full flex justify-center items-center active:opacity-80"
            >
                <Ionicons name="add" size={32} color="white" />
            </Pressable>
        </Animated.View>
    )
}
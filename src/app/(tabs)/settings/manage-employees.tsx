import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { FloatingActionButton } from "@/src/components/ui/fab";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "convex/react";
import { Link } from "expo-router";
import { Chip, PressableFeedback, SkeletonGroup } from "heroui-native";
import { ComponentProps } from "react";
import { Text, View } from "react-native";
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, { SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { withUniwind } from "uniwind";

type EmployeeType = Doc<"employees">;

export default function ManageUsers() {

    const employees = useQuery(api.employees.getEmployees)

    return (
        <View className="flex-1">
            <Link href={'/(tabs)/settings/new-employees'} asChild>
                <FloatingActionButton />
            </Link>
            <View className="flex-1">
                {!employees 
                    ? <LoadingSkeleton />
                    : (
                        <FlashList
                            data={employees}
                            renderItem={({ item }) => <Employee employee={item} />}
                            ItemSeparatorComponent={() => <View className="h-px w-full bg-gray-300" />}
                        />
                )}
            </View>
        </View>
    )
}

const Employee = ({ employee }: { employee: EmployeeType }) => {
    return (
        <ReanimatedSwipeable
            friction={2}
            rightThreshold={60}
            renderRightActions={(_, drag) =>
                RightActions(employee, drag)
            }
        >
            <View className="flex-row justify-between gap-4 p-4">
                <View>
                    <Text className="text-lg font-medium">{employee.position}. {employee.name}</Text>
                    <Text className="text-base font-medium text-muted"> Placa: {employee.licensePlate ?? 'Não informado'}</Text>
                </View>
                <Chip color={employee.active ? 'success' : 'danger'} variant="soft">
                    {employee.active ? 'Ativo' : 'Inativo'}
                </Chip>
            </View>
        </ReanimatedSwipeable>
    )
}

const StyledFontAwesome = withUniwind(FontAwesome)

function RightActions(
    employee: EmployeeType,
    drag: SharedValue<number>
) {
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: drag.value + 270 }],
        }
    })
  
    return (
        <Reanimated.View
            style={[
            {
                flexDirection: "row",
                height: "100%",
            },
            animatedStyle,
          ]}
        >
            {/* ATIVAR / INATIVAR */}
            <ActionButton
                color={employee.active ? "#f0ad4e" : "#5cb85c"}
                label={employee.active ? "Inativar" : "Ativar"}
                onPress={() => console.log("toggle active", employee._id)}
                iconName={employee.active ? 'toggle-off' : 'toggle-on'}
            />

            {/* EDITAR */}
            <ActionButton
                color="#0275d8"
                label="Editar"
                onPress={() => console.log("edit", employee._id)}
                iconName='edit'
            />

            {/* DELETAR */}
            <ActionButton
                color="#d9534f"
                label="Excluir"
                onPress={() => console.log("delete", employee._id)}
                iconName='trash'
            />
        </Reanimated.View>
    )
}

function ActionButton({
    color,
    label,
    iconName,
    onPress,
}: {
    color: string;
    label: string;
    iconName: ComponentProps<typeof FontAwesome>['name'];
    onPress: () => void;
}) {
    return (
        <PressableFeedback
            feedbackVariant="highlight"
            onPress={onPress}
            style={{
                width: 90,
                backgroundColor: color,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <StyledFontAwesome name={iconName} size={24} className="text-white" />
            <Text className="text-white font-bold">
                {label}
            </Text>
        </PressableFeedback>
    )
}

const LoadingSkeleton = () => {
    return (
        <SkeletonGroup className="gap-4">
            <SkeletonGroup.Item className="h-20 rounded-lg" />
            <SkeletonGroup.Item className="h-20 rounded-lg" />
            <SkeletonGroup.Item className="h-20 rounded-lg" />
            <SkeletonGroup.Item className="h-20 rounded-lg" />
            <SkeletonGroup.Item className="h-20 rounded-lg" />
            <SkeletonGroup.Item className="h-20 rounded-lg" />
        </SkeletonGroup>
    )
}
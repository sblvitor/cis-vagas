import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { FloatingActionButton } from "@/src/components/ui/fab";
import { StyledIonicons } from "@/src/components/ui/styled-ionicons";
import { FlashList } from "@shopify/flash-list";
import { useQuery } from "convex/react";
import { Link } from "expo-router";
import { Button, Card, SkeletonGroup } from "heroui-native";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

type EmployeeType = Doc<"employees">;

export default function ManageUsers() {

    const employees = useQuery(api.employees.getEmployees)

    return (
        <View className="flex-1 p-4">
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
                            ItemSeparatorComponent={() => <View className="h-4" />}
                        />
                )}
            </View>
        </View>
    )
}

const Employee = ({ employee }: { employee: EmployeeType }) => {
    return (
        <GestureHandlerRootView>
            <ReanimatedSwipeable>
                <Card>
                    <Card.Body className="flex-row justify-between items-center gap-4">
                        <View>
                            <Card.Title>{employee.position}. {employee.name}</Card.Title>
                            {employee.licensePlate && <Card.Description>{employee.licensePlate}</Card.Description>}
                        </View>
                        <View className="flex-row gap-4 items-center">
                            <Button variant="ghost" isIconOnly size="sm" onPress={() => {}}>
                                <StyledIonicons name="pencil" size={18} className="text-accent-foreground" />
                            </Button>
                            <Button variant="destructive" isIconOnly size="sm" onPress={() => {}}>
                                <StyledIonicons name="trash" size={18} className="text-accent-foreground" />
                            </Button>
                        </View>
                    </Card.Body>
                </Card>
            </ReanimatedSwipeable>
        </GestureHandlerRootView>
    )
}

const LoadingSkeleton = () => {
    return (
        <SkeletonGroup className="gap-4">
            <SkeletonGroup.Item className="h-16 rounded-xl" />
            <SkeletonGroup.Item className="h-16 rounded-xl" />
            <SkeletonGroup.Item className="h-16 rounded-xl" />
            <SkeletonGroup.Item className="h-16 rounded-xl" />
        </SkeletonGroup>
    )
}
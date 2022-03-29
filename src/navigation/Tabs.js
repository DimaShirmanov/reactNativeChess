import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Home from '../screens/Home';
import Board from '../screens/Board';

const Tab = createBottomTabNavigator();

const HomeNav = createStackNavigator();
const Main = createStackNavigator();

const defaultStackOptions = {
	...TransitionPresets.SlideFromRightIOS,
    headerShown: false
};

const defaultOptions = {
	// activeTintColor: appConfig.profileType === 'doctor' ? Palette.green : Palette.red,
	// inactiveTintColor: Palette.warmGrey,
	showLabel: true,
    headerShown: false
};

const defaultStackOptions2 = ({ route }) => ({
	headerRight: () => <></>,
	headerTitleAlign: 'center',
	headerTitle: route.params?.headerTitle,
	...TransitionPresets.SlideFromRightIOS,
});

const HomeNavigator = () => {
    return (
        <HomeNav.Navigator screenOptions={defaultStackOptions2}>
            <HomeNav.Screen options={{ headerShown: false }} name="Home" component={Home} />
            <HomeNav.Screen options={{ headerShown: false }} name="Game" component={Board} />
        </HomeNav.Navigator>
    )
}
const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={defaultOptions} tabBarOptions={{showLabel: true,}}>
            <Tab.Screen options={{
                tabBarLabel: 'Главная',
                tabBarStyle: { display: "none" },
            }} name="Home" component={HomeNavigator} />
        </Tab.Navigator>
    );
}

export default () => {
    return (
        <Main.Navigator screenOptions={defaultStackOptions}>
            <Main.Screen name="MainRoot" component={TabNavigator} />
        </Main.Navigator>
    )
};
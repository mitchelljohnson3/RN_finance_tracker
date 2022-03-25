import * as React from "react";
import { en, registerTranslation } from "react-native-paper-dates";
registerTranslation("en", en);
import FinanceTrackerTabNavigator from "./src/navigation/FinanceTrackerTabNavigator";
import SettingsScreen from "./src/screens/settings/SettingsScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import getTheme from "./src/server/get_theme";
import { fetchTheme, saveTheme } from "./src/server/db_access";
import { DefaultTheme } from "react-native-paper";

const Tab = createBottomTabNavigator();
export default function app() {
  const [theme, setTheme] = React.useState(DefaultTheme);
  // this effect function only runs once on startup
  // will be used to fetch the current theme from the database
  const [mounted, setMounted] = React.useState(0);
  React.useEffect(async () => {
    const colors = await fetchTheme();
    setTheme(getTheme(colors));
  }, [mounted, setMounted]);
  // saves a new theme to the app and the database
  const save_theme = (newTheme) => {
    setTheme(newTheme);
    saveTheme(newTheme.colors);
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          initialRouteName: "Finance",
          headerShown: false,
          tabBarLabelStyle: { color: theme.colors.text_color },
          tabBarActiveTintColor: theme.colors.text_color,
          tabBarInactiveTintColor: theme.colors.unselected,
        }}
      >
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="currency-usd"
                color={color}
                size={size}
              />
            ),
            tabBarStyle: { backgroundColor: theme.colors.primary },
          }}
          name="Finance"
          children={() => <FinanceTrackerTabNavigator theme={theme} />}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
            tabBarStyle: {
              backgroundColor: theme.colors.primary,
            },
          }}
          name="Settings"
          children={() => (
            <SettingsScreen theme={theme} saveTheme={save_theme} />
          )}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

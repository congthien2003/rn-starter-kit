import { AppButton, AppInput, AppText, SafeScreen } from "@/components";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoadingStore } from "@/stores/loadingStore";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const { login } = useAuth();
  const { isLoading } = useLoadingStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    const success = await login(data.email, data.password);
    if (success) {
      router.replace("/(tabs)");
    }
  };

  const handleRegister = () => {
    router.push("/auth/register");
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="h1" style={styles.title}>
            Đăng nhập
          </AppText>
          <AppText variant="body" style={styles.subtitle}>
            Chào mừng bạn quay trở lại!
          </AppText>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email không được để trống",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email không hợp lệ",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Email"
                placeholder="Nhập email của bạn"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: "Mật khẩu không được để trống",
              minLength: {
                value: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.password?.message}
                secureTextEntry
                autoCapitalize="none"
              />
            )}
          />

          <AppButton variant="primary" onPress={handleSubmit(onSubmit)} loading={isLoading} style={styles.loginButton}>
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          </AppButton>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <AppText variant="caption" style={styles.dividerText}>
              hoặc
            </AppText>
            <View style={styles.dividerLine} />
          </View>

          <AppButton variant="outline" onPress={handleRegister} style={styles.registerButton}>
            Tạo tài khoản mới
          </AppButton>
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginTop: 60,
    marginBottom: 40,
  },
  title: {
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
  },
  form: {
    flex: 1,
  },
  loginButton: {
    marginTop: 20,
    marginBottom: 24,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#eee",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#666",
  },
  registerButton: {
    marginBottom: 20,
  },
});

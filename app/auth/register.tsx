import { AppButton, AppInput, AppText, SafeScreen } from "@/components";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useLoadingStore } from "@/stores/loadingStore";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterScreen() {
  const { register } = useAuth();
  const { isLoading } = useLoadingStore();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data: RegisterFormData) => {
    const success = await register(data.email, data.password, data.name);
    if (success) {
      router.replace("/(tabs)");
    }
  };

  const handleLogin = () => {
    router.push("/auth/login");
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="h1" style={styles.title}>
            Tạo tài khoản
          </AppText>
          <AppText variant="body" style={styles.subtitle}>
            Điền thông tin để tạo tài khoản mới
          </AppText>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: "Họ tên không được để trống",
              minLength: {
                value: 2,
                message: "Họ tên phải có ít nhất 2 ký tự",
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Họ tên"
                placeholder="Nhập họ tên của bạn"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.name?.message}
                autoCapitalize="words"
                autoCorrect={false}
              />
            )}
          />

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
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: "Mật khẩu phải có chữ hoa, chữ thường và số",
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
                helperText="Tối thiểu 6 ký tự, có chữ hoa, chữ thường và số"
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Xác nhận mật khẩu không được để trống",
              validate: (value) => value === password || "Mật khẩu xác nhận không khớp",
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <AppInput
                label="Xác nhận mật khẩu"
                placeholder="Nhập lại mật khẩu"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                error={errors.confirmPassword?.message}
                secureTextEntry
                autoCapitalize="none"
              />
            )}
          />

          <AppButton
            variant="primary"
            onPress={handleSubmit(onSubmit)}
            loading={isLoading}
            style={styles.registerButton}
          >
            {isLoading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
          </AppButton>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <AppText variant="caption" style={styles.dividerText}>
              hoặc
            </AppText>
            <View style={styles.dividerLine} />
          </View>

          <AppButton variant="outline" onPress={handleLogin} style={styles.loginButton}>
            Đã có tài khoản? Đăng nhập
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
  registerButton: {
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
  loginButton: {
    marginBottom: 20,
  },
});

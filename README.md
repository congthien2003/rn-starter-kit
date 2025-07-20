# Mobile Starter Kit

Một React Native starter kit với Expo Router, được thiết kế theo kiến trúc modular để dễ dàng mở rộng và maintain.

## 🚀 Tech

-   **Expo Router v5** - File-based routing
-   **TypeScript** - Type safety
-   **Zustand** - State management
-   **Axios** - HTTP client với interceptors đơn giản
-   **AsyncStorage** - Local storage
-   **React Hook Form** - Form management và validation
-   **Modular Architecture** - Tổ chức code theo module
-   **Toast Notifications** - Error/Info/Success messages
-   **Light Theme Only** - Simplified theming

## 📁 Architecture

```
mobile-starter-kit/
├── app/                    # Expo Router pages
│   ├── (tabs)/            # Tab navigation
│   │   ├── index.tsx      # Home screen
│   │   ├── explore.tsx    # Explore screen
│   │   ├── demo.tsx       # Demo components
│   │   └── _layout.tsx    # Tab layout
│   ├── auth/              # Auth screens
│   │   ├── login.tsx      # Login với React Hook Form
│   │   └── register.tsx   # Register với validation
│   └── _layout.tsx        # Root layout
├── components/            # Shared components
│   ├── SafeScreen.tsx     # SafeArea + KeyboardAvoidingView wrapper
│   ├── AppText.tsx        # Text component với Roboto font
│   ├── AppInput.tsx       # Input component với validation
│   ├── AppButton.tsx      # Button component với nhiều variants
│   ├── AppModal.tsx       # Modal component với animation
│   ├── LoadingOverlay.tsx # Global loading overlay
│   ├── ErrorNotification.tsx # Toast notifications
│   └── index.ts           # Component exports
├── contexts/              # React Contexts
│   └── AuthContext.tsx    # Authentication context
├── stores/                # Zustand stores
│   ├── loadingStore.ts    # Global loading state
│   └── errorStore.ts      # Global error/notification state
├── modules/               # Feature modules
│   ├── auth/              # Authentication module
│   │   ├── models/        # TypeScript interfaces
│   │   ├── hooks/         # Auth hooks với try-catch
│   │   └── services/      # Auth API services
│   └── user/              # User module
│       ├── hooks/         # User hooks
│       └── services/      # User API services
├── libs/                  # Third-party libraries setup
│   └── axios.ts           # Axios instance với 401 handling
├── styles/                # Global styles
│   └── common.ts          # Common style utilities
├── constants/             # App constants
│   └── Colors.ts          # Light theme colors
└── hooks/                 # Custom hooks
    ├── useColorScheme.ts  # Theme hook (light only)
    └── useThemeColor.ts   # Color hook
```

## 🏗️ Kiến trúc Modular

### 1. **Components Layer** (`/components`)

-   **Base Components**: Các component cơ bản có thể tái sử dụng
-   **SafeScreen**: Wrapper cho SafeAreaView và KeyboardAvoidingView
-   **AppText**: Text component với Roboto font, light theme only
-   **AppInput**: Input component với label, error, helper text
-   **AppButton**: Button component với nhiều variants và loading state
-   **AppModal**: Modal component với animation
-   **LoadingOverlay**: Global loading overlay
-   **ErrorNotification**: Toast notifications với icons

### 2. **Contexts Layer** (`/contexts`)

-   **AuthContext**: Quản lý authentication state
-   Tích hợp với AsyncStorage để persist data
-   Cung cấp login, register, logout methods

### 3. **Stores Layer** (`/stores`)

-   **Zustand stores**: Global state management
-   **loadingStore**: Quản lý global loading state
-   **errorStore**: Quản lý toast notifications
-   Dễ dàng mở rộng thêm stores khác

### 4. **Modules Layer** (`/modules`)

Mỗi feature được tổ chức thành module riêng biệt:

```
modules/
├── auth/                  # Authentication module
│   ├── models/           # TypeScript interfaces
│   ├── hooks/            # Custom hooks với try-catch
│   └── services/         # API services
├── user/                 # User module
│   ├── hooks/            # User-related hooks
│   └── services/         # User API services
└── [feature]/            # Thêm modules khác
```

### 5. **Libraries Layer** (`/libs`)

-   **Axios setup**: HTTP client với interceptors đơn giản
-   Authentication token handling với 401 auto-logout
-   Response data extraction (response.data)
-   Error handling với message extraction

### 6. **Styles Layer** (`/styles`)

-   **Common styles**: Utility styles cho layout, buttons, inputs
-   Consistent design system với light theme
-   Roboto font family

## 🛠️ Cách sử dụng

### 1. **SafeScreen Component**

```tsx
import { SafeScreen } from '@/components';

// Basic usage
<SafeScreen>
  <YourContent />
</SafeScreen>

// With scroll
<SafeScreen scrollable>
  <YourScrollableContent />
</SafeScreen>

// Without keyboard avoiding
<SafeScreen keyboardAvoidingView={false}>
  <YourContent />
</SafeScreen>
```

### 2. **Global Loading & Error Handling**

```tsx
import { useLoadingStore } from "@/stores/loadingStore";
import { useErrorStore } from "@/stores/errorStore";

const { showLoading, hideLoading } = useLoadingStore();
const { addError } = useErrorStore();

// Show loading
showLoading("Loading data...");

// Hide loading
hideLoading();

// Show notifications
addError("Success message", "success");
addError("Error message", "error");
addError("Warning message", "warning");
addError("Info message", "info");
```

### 3. **Authentication với Custom Hook**

#### **1. Model (TypeScript Interface)**

```tsx
// modules/auth/models/LoginRequest.ts
export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	user: {
		id: string;
		email: string;
		name: string;
		avatar?: string;
	};
	token: string;
	refreshToken?: string;
}
```

#### **2. Service (API Layer)**

```tsx
// modules/auth/services/api.ts
import { api } from "@/libs/axios";
import { LoginRequest, LoginResponse } from "../models/LoginRequest";

export const authService = {
	login: async (data: LoginRequest): Promise<LoginResponse> => {
		return (await api.post("/auth/login", data)) as LoginResponse;
	},

	register: async (
		data: RegisterUserRequest
	): Promise<RegisterUserResponse> => {
		return (await api.post("/auth/register", data)) as RegisterUserResponse;
	},
};
```

#### **3. Custom Hook (Business Logic với Try-Catch)**

```tsx
// modules/auth/hooks/useAuth.ts
import { useCallback } from "react";
import { authService } from "../services/api";
import { useAuth as useAuthContext } from "@/contexts/AuthContext";
import { useErrorStore } from "@/stores/errorStore";
import { useLoadingStore } from "@/stores/loadingStore";

export const useAuth = () => {
	const { setUser } = useAuthContext();
	const { addError } = useErrorStore();
	const { showLoading, hideLoading } = useLoadingStore();

	const login = useCallback(
		async (email: string, password: string): Promise<boolean> => {
			try {
				showLoading("Đang đăng nhập...");
				const result = await authService.login({ email, password });

				// Update context with user data
				setUser(result.user);

				addError("Đăng nhập thành công!", "success");
				return true;
			} catch (error) {
				const message =
					error instanceof Error
						? error.message
						: "Đăng nhập thất bại";
				addError(message, "error");
				return false;
			} finally {
				hideLoading();
			}
		},
		[setUser, addError, showLoading, hideLoading]
	);

	return { login, register, logout };
};
```

#### **4. Screen (UI Layer với React Hook Form)**

```tsx
// app/auth/login.tsx
import { useAuth } from "@/modules/auth/hooks/useAuth";
import { useLoadingStore } from "@/stores/loadingStore";
import { useForm, Controller } from "react-hook-form";

export default function LoginScreen() {
	const { login } = useAuth();
	const { isLoading } = useLoadingStore();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { email: "", password: "" },
	});

	const onSubmit = async (data) => {
		const success = await login(data.email, data.password);
		if (success) {
			router.replace("/(tabs)");
		}
	};

	return (
		<SafeScreen>
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
				render={({ field: { onChange, value } }) => (
					<AppInput
						label="Email"
						value={value}
						onChangeText={onChange}
						error={errors.email?.message}
					/>
				)}
			/>
			<AppButton onPress={handleSubmit(onSubmit)} loading={isLoading}>
				Đăng nhập
			</AppButton>
		</SafeScreen>
	);
}
```

#### 🎯 Ưu điểm của approach mới:

1. 🎨 **Separation of Concerns**: Mỗi layer có trách nhiệm rõ ràng
2. 🔄 **Reusability**: Hook có thể tái sử dụng ở nhiều screens
3. 🐛 **Type Safety**: TypeScript đầy đủ từ model đến screen
4. 🎯 **Clean UI**: Screen chỉ focus vào UI, không có business logic
5. ⚡ **Simple Error Handling**: Try-catch trong custom hooks, toast tự động
6. 🛡️ **Auto 401 Handling**: Axios tự động xử lý token expired
7. 🎨 **Form Validation**: React Hook Form với validation rules
8. 🎯 **Maintainable**: Dễ debug và maintain

### 4. **API Calls**

```tsx
import { api } from "@/libs/axios";

// Axios trả về response.data trực tiếp
// 401 errors được xử lý tự động (clear token + redirect)

// GET request
const users = await api.get("/users");

// POST request
const newUser = await api.post("/users", userData);

// PUT request
const updatedUser = await api.put(`/users/${id}`, updateData);

// Error handling trong custom hooks
try {
	const result = await authService.login({ email, password });
	// Success handling
} catch (error) {
	// Error message từ API
	console.log(error.message); // "Email hoặc mật khẩu không đúng"
}
```

### 5. **Form Validation với React Hook Form**

```tsx
import { useForm, Controller } from "react-hook-form";

const {
	control,
	handleSubmit,
	formState: { errors },
} = useForm({
	defaultValues: { email: "", password: "" },
});

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
	render={({ field: { onChange, value } }) => (
		<AppInput
			label="Email"
			value={value}
			onChangeText={onChange}
			error={errors.email?.message}
		/>
	)}
/>;
```

## 📦 Thêm module mới

1. **Tạo cấu trúc module**:

```
modules/
└── new-feature/
    ├── models/           # TypeScript interfaces
    ├── hooks/            # Custom hooks với try-catch
    └── services/         # API services
```

2. **Tạo service**:

```tsx
// modules/new-feature/services/api.ts
import { api } from "@/libs/axios";
import { NewFeatureRequest, NewFeatureResponse } from "../models/NewFeature";

export const newFeatureService = {
	getData: async (): Promise<NewFeatureResponse[]> => {
		return (await api.get("/new-feature")) as NewFeatureResponse[];
	},

	createData: async (
		data: NewFeatureRequest
	): Promise<NewFeatureResponse> => {
		return (await api.post("/new-feature", data)) as NewFeatureResponse;
	},
};
```

3. **Tạo hooks**:

```tsx
// modules/new-feature/hooks/useNewFeature.ts
import { useState, useCallback } from "react";
import { newFeatureService } from "../services/api";
import { useErrorStore } from "@/stores/errorStore";
import { useLoadingStore } from "@/stores/loadingStore";

export const useNewFeature = () => {
	const [data, setData] = useState([]);
	const { addError } = useErrorStore();
	const { showLoading, hideLoading } = useLoadingStore();

	const fetchData = useCallback(async () => {
		try {
			showLoading("Đang tải dữ liệu...");
			const result = await newFeatureService.getData();
			setData(result);
			addError("Tải dữ liệu thành công!", "success");
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Tải dữ liệu thất bại";
			addError(message, "error");
		} finally {
			hideLoading();
		}
	}, [addError, showLoading, hideLoading]);

	return { data, fetchData };
};
```

## 🚀 Getting Started

1. **Clone repository**:

```bash
git clone <repository-url>
cd mobile-starter-kit
```

2. **Install dependencies**:

```bash
npm install
```

3. **Start development server**:

```bash
npm start
```

4. **Run on device/simulator**:

```bash
npm run ios     # iOS
npm run android # Android
npm run web     # Web
```

## 📱 Demo

Chạy app và vào tab "Demo" để xem các components đã được implement:

-   SafeScreen với keyboard handling
-   AppText với Roboto font
-   AppInput với validation
-   AppModal với animation
-   Global loading overlay
-   Toast notifications với icons
-   Authentication flow với React Hook Form
-   Common styles showcase

## 🔧 Configuration

### Environment Variables

Tạo file `.env`:

```
EXPO_PUBLIC_API_URL=https://your-api-url.com
```

### Theme Configuration

Chỉnh sửa `constants/Colors.ts` để customize light theme colors.

## 📚 Dependencies

-   **Expo SDK 53**
-   **React Native 0.79.5**
-   **Expo Router 5.1.4**
-   **Zustand** - State management
-   **Axios** - HTTP client
-   **AsyncStorage** - Local storage
-   **React Hook Form** - Form management
-   **React Native Reanimated** - Animations
-   **Expo Google Fonts** - Roboto font

## 🤝 Contributing

1. Fork repository
2. Tạo feature branch
3. Commit changes
4. Push to branch
5. Tạo Pull Request

## 📄 License

MIT License

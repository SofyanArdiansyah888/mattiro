import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import "./index.css"
import {ConfigProvider} from "antd";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {AuthProvider} from "./providers/AuthProvider";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <AuthProvider>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#1677ff",
                        borderRadius: 8,
                    },
                    components: {
                        Card: {
                            headerBg: "#3b82f6"
                        },
                        Timeline: {
                            itemPaddingBottom: 0
                        }
                    }
                }}
            >
                <QueryClientProvider client={queryClient}>
                    <App/>
                </QueryClientProvider>
            </ConfigProvider>
        </AuthProvider>
    </React.StrictMode>
);
## 播放器内核设计

```bash
core/
├── config/
│   └── config.tsx        		# 系统和插件的配置管理
├── plugins/
│   ├── pluginManager.tsx  		# 插件注册、加载、生命周期管理
│   ├── pluginInterface.ts 		# 插件接口定义
│   └── pluginLoader.tsx   		# 插件动态加载
├── services/
│   ├── eventService.tsx   		# 事件系统服务
│   ├── dependencyInjector.tsx 	# 依赖注入服务
│   └── logger.tsx         		# 日志记录服务
├── system/
│   ├── system.tsx         		# 系统初始化和核心功能实现
│   └── startup.tsx        		# 启动流程
└── utils/
│   └─── utils.tsx         		# 实用工具函数
└── index.tsx
```

### 插件生命周期

注册

```ts
Core.register(plugin);
```

配置

```ts
Core.register(plugin, config);
```

执行

```ts

```

更新

卸载

错误处理
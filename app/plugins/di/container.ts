interface ServiceFactory<T = unknown> {
  (container: DIContainer, apiBase: string): T;
}

class DIContainer {
  private services: Map<string, ServiceFactory> = new Map();

  register<T>(key: string, factory: ServiceFactory<T>) {
    this.services.set(key, factory);
  }

  resolve<T>(key: string, apiBase: string): T {
    const factory = this.services.get(key);
    if (!factory) {
      throw new Error(`Service ${key} not registered`);
    }
    return factory(this, apiBase) as T;
  }
}

export const container = new DIContainer();

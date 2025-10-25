import 'dotenv/config'

class Config {
    private get(key: string): string | undefined {
        return process.env[key]
    }

    private getOrThrow(key: string): string {
        const value = this.get(key)
        if (!value) {
            throw new Error(`Missing required environment variable: ${key}`)
        }
        return value
    }

    public get TELEGRAM_BOT_TOKEN(): string {
        return this.getOrThrow('TELEGRAM_BOT_TOKEN')
    }

    public get API_URL(): string {
        return this.getOrThrow('API_URL')
    }

    public get WEB_APP_URL(): string {
        return this.getOrThrow('WEB_APP_URL')
    }

    public get GROQ_API_KEY(): string {
        return this.getOrThrow('GROQ_API_KEY')
    }

    public get NODE_ENV(): string {
        return this.getOrThrow('NODE_ENV')
    }
}

export const config = new Config()

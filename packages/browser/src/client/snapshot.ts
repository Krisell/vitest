import { rpc } from './rpc'
import type { SnapshotEnvironment } from '#types'

export class BrowserSnapshotEnvironment implements SnapshotEnvironment {
  getVersion(): string {
    return '1'
  }

  getHeader(): string {
    return `// Vitest Snapshot v${this.getVersion()}, https://vitest.dev/guide/snapshot.html`
  }

  readSnapshotFile(filepath: string): Promise<string | null> {
    return rpc().readFile(filepath)
  }

  saveSnapshotFile(filepath: string, snapshot: string): Promise<void> {
    return rpc().writeFile(filepath, snapshot, true)
  }

  resolvePath(filepath: string): Promise<string> {
    return rpc().resolveSnapshotPath(filepath)
  }

  resolveRawPath(testPath: string, rawPath: string): Promise<string> {
    return rpc().resolveSnapshotRawPath(testPath, rawPath)
  }

  removeSnapshotFile(filepath: string): Promise<void> {
    return rpc().removeFile(filepath)
  }

  async prepareDirectory(dirPath: string): Promise<void> {
    await rpc().createDirectory(dirPath)
  }
}

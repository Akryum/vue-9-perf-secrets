export function splitArray (list, chunkLength) {
  const chunks = []
  let chunk = []
  let i = 0
  let l = 0
  let n = list.length
  while (i < n) {
    chunk.push(list[i])
    l++
    if (l === chunkLength) {
      chunks.push(chunk)
      chunk = []
      l = 0
    }
    i++
  }
  chunk.length && chunks.push(chunk)
  return chunks
}

export class JobQueue {
  constructor ({ autoStart = false } = {}) {
    this.autoStart = autoStart

    this._queue = []
    this._running = false
    this._results = []
    this._resolves = []
    this._rejects = []
    this._runId = 0
  }

  get length () {
    return this._queue.length
  }

  addJob (func) {
    this._queue.push(async () => {
      try {
        const runId = this._runId
        const result = func(() => {
          // Run not cancelled
          if (runId === this._runId) {
            this._results.push(result)
            this._next()
          }
        })
      } catch (error) {
        this._reject(error)
      }
    })

    if (this.autoStart && this.length === 1) {
      this.start()
    }
  }

  clear () {
    this._running = false
    this._queue.length = 0
    this._resolves.length = 0
    this._rejects.length = 0
    this._results.length = 0
    this._runId++
  }

  cancel () {
    this._resolve()
    this.clear()
  }

  start () {
    return new Promise((resolve, reject) => {
      if (!this._running && this.length > 0) {
        this._running = true
        this._queue[0]()
        this._resolves.push(resolve)
        this._rejects.push(reject)
      } else {
        resolve()
      }
    })
  }

  _next () {
    if (this._running && this.length > 0) {
      this._queue.shift()

      if (this.length === 0) {
        this._resolve()
      } else {
        this._queue[0]()
      }
    }
  }

  _resolve () {
    this._resolves.forEach(f => f(this._results))
    this.clear()
  }

  _reject (error) {
    this._rejects.forEach(f => f(error))
    this.clear()
  }
}

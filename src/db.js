import sqlite from 'sqlite'

import assert from 'assert'

let _db

export const initializeDb = cb => {
    if (_db) {
        console.warn('DB has already been initialized')
        return cb(null, _db)
    }
    Promise.resolve()
        .then(() =>
            sqlite.open('./database.sqlite', {
            Promise
            })
        )
        .then(db =>
            db.migrate({
            migrationsPath: './db/migrations',
            force: 'last'
            })
        )
        .then(db => {
            db.run('PRAGMA foreign_key = ON');
            console.log('DB Initialized')
            _db = db
            return cb(null, _db)
        })
}

export const getDb = () => {
    assert.ok(_db, 'DB has not been initialized.')
    return _db
}

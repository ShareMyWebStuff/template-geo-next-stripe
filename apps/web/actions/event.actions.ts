'use server';

import { db } from '@/utils/db/db';


export const getSomething = async () => {

    try {
      const res = await db.query(
        `SELECT * FROM user`,
      );
      console.log(res)

      return true;
    
    } catch (error) {
        console.log ('SERVER ACTION ERROR')
        console.log (error)
        throw new Error ('Error saving members about profile.')
    }

}
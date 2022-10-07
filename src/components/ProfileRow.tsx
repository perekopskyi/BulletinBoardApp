import React from 'react'

export const ProfileRow = ({ title, value }: any) => (
  <tr className="">
    <td className="font-bold w-1/4">{title}</td>
    <td>{value}</td>
  </tr>
)

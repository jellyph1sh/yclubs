import { useEffect, useState } from "react";
import axios from "axios";
import "./TransferBox.css"

const TransferBox = () => {
    return (
        <div className="transfer-box">
            <h3 className="transfer-title">Transfert</h3>
            <div className="transfer-body">
                <div className="transfer-selects">
                    <select name="giver" id="giver-input">
                        <option value="eat">Club de manger</option>
                        <option value="sleep">Club de dormir</option>
                    </select>
                    <p>à</p>
                    <select name="receiver" id="receiver-input">
                        <option value="eat">Club de manger</option>
                        <option value="sleep">Club de dormir</option>
                    </select>
                </div>
                <div className="transfer-input">
                    <label htmlFor="number">Montant :</label>
                    <input type="number" name="amount" id="amount-input" />
                </div>
                <button type="submit">Transférer</button>
            </div>
        </div>
    );
}

export default TransferBox
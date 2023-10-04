import * as React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { debounce } from "lodash";
import classNames from "classnames/bind";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import Image from '../Image';

import styles from './SearchBar.module.scss';

const cx = classNames.bind(styles);

const SearchBar: React.FC<any> = ({ placeholder, data }) => {
    const [filteredData, setFilteredData] = useState<{
        id: string;
        name: string;
        description: string;
        specification: { id: number; specification: string }[];
        imageProducts: { id: number; image: string }[];
        price: number;
        brand: { id: number; name: string; image: string };
        event: null;
        status: boolean;
        category: { id: number; name: string; image: string; status: boolean };
        idBrand: number;
        idCategory: number;
        idEvent: number;
        quantity: number;
    }[]>([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleDebouncedFilter = debounce((searchWord) => {
        const newFilter = data.filter((value: { name: string; id: string; }) => {
            return (
                value.name.toLowerCase().includes(searchWord.toLowerCase()) ||
                value.id.toLowerCase().includes(searchWord.toLowerCase())
            );
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    }, 1000);

    const handleFilter = (event: { target: { value: any; }; }) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);

        handleDebouncedFilter(searchWord);
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    return (
        <div className={cx('search')}>
            <div className={cx('searchInputs')}>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                    className={cx('searchInput')}
                />
                <div className={cx('searchIcon')}>
                    {filteredData.length === 0 ? (
                        <FontAwesomeIcon
                            icon={faMagnifyingGlass}
                            style={{ color: '#434343' }}
                        />
                    ) : (
                        <FontAwesomeIcon
                            id="clearBtn"
                            icon={faXmark}
                            style={{ color: '#434343', cursor: 'pointer' }}
                            onClick={clearInput}
                        />
                    )}
                </div>
            </div>
            {filteredData.length !== 0 && (
                <div className={cx('dataResult')}>
                    {filteredData.map((value, key) => {
                        return (
                            <div className={cx('dataItem')}>
                                <Link to={`/detailProduct/${value.id}`} className={cx('inner')}>
                                    <div className={cx('image')}>
                                        {value.imageProducts && value.imageProducts.length > 0 && (
                                            <Image src={value.imageProducts[0].image} />
                                        )}
                                    </div>
                                    <div className={cx('text')}>
                                        <p>{value.name} {value.id}</p>
                                        <p style={{ color: '#018ec3' }}>{value.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ</p>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;

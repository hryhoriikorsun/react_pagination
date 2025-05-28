import React from 'react';

import cn from 'classnames';
import { StratureIDAndBody } from '../../types/StratureIDAndBody';

type CountNumbersOfPages = (a: number, b: string) => StratureIDAndBody[];

interface Props {
  total: number;
  perPage: string;
  currentPage: string;
  onPageChange?: (value: string) => void;
}

export const Pagination: React.FC<Props> = ({
  total,
  perPage,
  currentPage,
  onPageChange = () => {},
}) => {
  const countNumbersOfPages: CountNumbersOfPages = (
    totalLength,
    perPageLength,
  ) => {
    let quantityPages: StratureIDAndBody[] = [];

    const howManyPages = Math.ceil(totalLength / Number(perPageLength));

    for (let i = 1; i <= howManyPages; i++) {
      quantityPages = [...quantityPages, { id: `${i}`, body: `${i}` }];
    }

    return quantityPages;
  };

  const numberOfPages = countNumbersOfPages(total, perPage);

  return (
    <ul className="pagination">
      <li className={cn('page-item', { disabled: currentPage === '1' })}>
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={currentPage === '1'}
          onClick={() => {
            if (currentPage !== '1') {
              onPageChange(String(+currentPage - 1));
            }
          }}
        >
          «
        </a>
      </li>

      {numberOfPages.map((numberPage, idx) => {
        return (
          <li
            key={numberPage.id}
            className={cn('page-item', {
              active: currentPage === numberPage.body,
            })}
          >
            <a
              data-cy="pageLink"
              className="page-link"
              href={`#${idx + 1}`}
              onClick={() => onPageChange(numberPage.body)}
            >
              {numberPage.body}
            </a>
          </li>
        );
      })}

      <li
        className={cn('page-item', {
          disabled: currentPage === String(numberOfPages.length),
        })}
      >
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={currentPage === String(numberOfPages.length)}
          onClick={() => {
            if (currentPage !== String(numberOfPages.length)) {
              onPageChange(String(+currentPage + 1));
            }
          }}
        >
          »
        </a>
      </li>
    </ul>
  );
};

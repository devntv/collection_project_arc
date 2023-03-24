/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */
import { Accordion, AccordionDetails, Box, FormGroup } from '@material-ui/core';
import { Check, KeyboardArrowDown } from '@material-ui/icons';
import clsx from 'clsx';
import { CheckBox, Radio } from 'components/atoms';
import { ENUMS_FILTER_CATEGORY_TYPE } from 'constants/Enums';
import { useRouter } from 'next/router';
import { useState } from 'react';
import styles from './styles.module.css';

const CategoryFilterProduct = ({ categories, name, defaultExpanded = true, type }) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const router = useRouter();

  let filter = {};

  try {
    filter = JSON.parse(router.query?.filter || '{}') || {};
  } catch (e) {
    router.push('/products');
    filter = {};
  }
  // eslint-disable-next-line no-shadow
  const getNewFilter = (filter, categoryFilters) => {
    const newFilter = {
      ...filter,
      categoryFilters:
        categoryFilters?.filter((item) => item.categoryCodes?.length > 0 || item.efficacyCodes?.length > 0 || item.sellerCategoryCodes?.length > 0) ||
        [],
    };

    if (!newFilter?.categoryFilters?.length) delete newFilter.categoryFilters;

    if (!Object.keys(newFilter).length) return null;

    return newFilter;
  };

  // eslint-disable-next-line no-shadow
  const isChecked = (filter, filterItem) => {
    if (type === ENUMS_FILTER_CATEGORY_TYPE.EXTRA_CATEGORY) {
      return router.query?.tag === filterItem.code;
    }

    if (type === ENUMS_FILTER_CATEGORY_TYPE.MANUFACTURER) {
      return router.query?.slug === filterItem.slug;
    }

    if (router.query?.filter && filter.categoryFilters) {
      if (type === ENUMS_FILTER_CATEGORY_TYPE.CATEGORY) {
        const { relatedCategoryCodes, relatedEfficacyCodes, relatedSellerCategoryCodes, code } = filterItem;
        const categoryFilters = filter.categoryFilters || [];

        if (relatedCategoryCodes && relatedSellerCategoryCodes && relatedEfficacyCodes) {
          return categoryFilters?.filter((item) => item.isCombined)?.findIndex((item) => item.code === filterItem.code) >= 0;
        }

        return categoryFilters
          ?.filter((item) => !item.isCombined)
          ?.some((item) => item?.categoryCodes?.includes(code) || item?.efficacyCodes?.includes(code) || item?.sellerCategoryCodes?.includes(code));
      }
    }

    return false;
  };

  // eslint-disable-next-line no-shadow
  const handleClick = (filter, filterItem) => {
    if (isChecked(filter, filterItem)) {
      if (type === ENUMS_FILTER_CATEGORY_TYPE.EXTRA_CATEGORY) {
        const newQuery = { ...router.query };
        delete newQuery.tag;
        delete newQuery.page;
        router.push(
          {
            ...router,
            query: {
              ...newQuery,
              page: 1,
            },
          },
          undefined,
          { scroll: false },
        );
        return;
      }

      if (type === ENUMS_FILTER_CATEGORY_TYPE.MANUFACTURER) {
        const newQuery = { ...router.query };
        delete newQuery.slug;
        delete newQuery.manufacturer;
        delete newQuery.page;
        router.push(
          {
            ...router,
            pathname: '/products',
            query: {
              ...newQuery,
              page: 1,
            },
          },
          undefined,
          { scroll: false },
        );
        return;
      }

      if (type === ENUMS_FILTER_CATEGORY_TYPE.CATEGORY) {
        let categoryFilters = filter.categoryFilters || [];

        if (filterItem.relatedCategoryCodes && filterItem.relatedSellerCategoryCodes && filterItem.relatedEfficacyCodes) {
          categoryFilters = categoryFilters.filter((item) => item.code !== filterItem.code);
        } else if (filterItem.categoryCode) {
          categoryFilters.forEach((category, index) => {
            if (category?.efficacyCodes?.includes(filterItem.code)) {
              categoryFilters[index] = {
                ...categoryFilters[index],
                efficacyCodes: categoryFilters[index]?.efficacyCodes?.filter((code) => code !== filterItem.code) || [],
              };
            }
          });
        } else {
          categoryFilters = categoryFilters.filter((item) => item.code !== filterItem.code && !item.categoryCodes?.includes(filterItem.code));
        }

        const newFilter = getNewFilter(filter, categoryFilters);

        const newQuery = {
          ...router.query,
          filter: JSON.stringify(newFilter),
        };

        if (!newFilter) delete newQuery.filter;
        delete newQuery.page;

        router.push(
          {
            ...router,
            query: {
              ...newQuery,
              page: 1,
            },
          },
          undefined,
          { scroll: false },
        );
      }
    } else {
      if (type === ENUMS_FILTER_CATEGORY_TYPE.EXTRA_CATEGORY) {
        router.push(
          {
            ...router,
            query: {
              ...router.query,
              tag: filterItem.code,
              page: 1,
            },
          },
          undefined,
          { scroll: false },
        );
        return;
      }

      if (type === ENUMS_FILTER_CATEGORY_TYPE.MANUFACTURER && router.asPath !== '/manufacturers/[slug]') {
        router.push(
          {
            ...router,
            query: {
              ...router.query,
              page: 1,
            },
            pathname: `/manufacturers/${filterItem?.slug}`,
          },
          undefined,
          { scroll: false },
        );
        return;
      }

      if (type === ENUMS_FILTER_CATEGORY_TYPE.CATEGORY) {
        const categoryFilters = filter.categoryFilters || [];

        if (filterItem.categoryCode) {
          const categoryIndex = categoryFilters.findIndex((item) => item.code === filterItem.categoryCode);
          if (categoryIndex >= 0) {
            categoryFilters[categoryIndex] = {
              ...categoryFilters[categoryIndex],
              efficacyCodes: [...(categoryFilters[categoryIndex]?.efficacyCodes || []), filterItem.code],
            };
          } else {
            categoryFilters.push({
              ...categoryFilters[categoryIndex],
              efficacyCodes: [...(categoryFilters[categoryIndex]?.efficacyCodes || []), filterItem.code],
            });
          }
        } else if (filterItem.relatedSellerCategoryCodes && filterItem.relatedCategoryCodes && filterItem.relatedEfficacyCodes) {
          const categoryIndex = categoryFilters.findIndex((item) => item.code === filterItem.categoryCode);
          const combinedCodes = {
            isCombined: true,
            sellerCategoryCodes: filterItem.relatedSellerCategoryCodes,
            categoryCodes: filterItem.relatedCategoryCodes,
            efficacyCodes: filterItem.relatedEfficacyCodes,
          };
          if (categoryIndex >= 0) {
            categoryFilters[categoryIndex] = {
              ...categoryFilters[categoryIndex],
              ...combinedCodes,
            };
          } else {
            categoryFilters.push({
              code: filterItem.code,
              ...combinedCodes,
            });
          }
        } else {
          const categoryIndex = categoryFilters.findIndex((item) => item.code === filterItem.code);
          if (categoryIndex >= 0) {
            categoryFilters[categoryIndex] = {
              ...categoryFilters[categoryIndex],
              categoryCodes: [...categoryFilters[categoryIndex].categoryCodes, filterItem.code],
            };
          } else {
            categoryFilters.push({
              code: filterItem.code,
              categoryCodes: [filterItem.code],
              efficacyCodes: [],
              sellerCategoryCodes: [],
            });
          }
        }

        const newFilter = getNewFilter(filter, categoryFilters);

        const newQuery = {
          ...router.query,
          filter: JSON.stringify(newFilter),
        };

        if (!newFilter) delete newQuery.filter;
        delete newQuery.page;

        router.push(
          {
            ...router,
            query: {
              ...newQuery,
              page: 1,
            },
          },
          undefined,
          { scroll: false },
        );
      }
    }
  };

  return (
    <div>
      <Accordion className="filter-product-accordion" expanded={expanded}>
        <button
          className={styles.accordionHeader}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          <p>{name}</p>
          <span className={clsx(expanded && styles.buttonExpanded, styles.buttonExpand)}>
            <KeyboardArrowDown />
          </span>
        </button>
        <AccordionDetails className="accordion-detail" style={{ display: 'block' }}>
          <FormGroup style={{ flexDirection: 'column', flexWrap: 'nowrap' }}>
            {categories &&
              categories
                // sort danh sách lọc theo alphabet
                // eslint-disable-next-line no-nested-ternary
                .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0))
                .map((item) => (
                  <div key={item.code}>
                    {[ENUMS_FILTER_CATEGORY_TYPE.EXTRA_CATEGORY, ENUMS_FILTER_CATEGORY_TYPE.MANUFACTURER].includes(type) ? (
                      <Box
                        style={{ display: 'flex', alignItems: 'center' }}
                        onClick={() => {
                          handleClick(filter, item);
                        }}
                      >
                        <Radio
                          checked={isChecked(filter, item)}
                          onClick={() => {
                            handleClick(filter, item);
                          }}
                          className="filter-product-radio"
                        />
                        <span className={styles.radioLabel} style={{ fontWeight: isChecked(filter, item) ? 'bold' : 'initial' }}>
                          {type === ENUMS_FILTER_CATEGORY_TYPE.MANUFACTURER ? (item.shortName || item.name) : item.name}
                        </span>
                      </Box>
                    ) : (
                      <>
                        <CheckBox
                          checkedIcon={<Check />}
                          label={
                            <span>
                              {item.name}
                              {item?.subEfficacies?.length > 0 && <b> ({item.subEfficacies.length})</b>}
                            </span>
                          }
                          className="filter-product-checkbox"
                          checked={isChecked(filter, item)}
                          onClick={() => {
                            handleClick(filter, item);
                          }}
                        />

                        {item?.subEfficacies?.length > 0 && isChecked(filter, item) && (
                          <div className={styles.subEffWrapper}>
                            {item?.subEfficacies?.map((subEff) => (
                              <div className={styles.subEffItem} key={subEff.code}>
                                <CheckBox
                                  checkedIcon={<Check />}
                                  label={subEff.name}
                                  className="filter-product-checkbox"
                                  checked={isChecked(filter, subEff)}
                                  onClick={() => {
                                    handleClick(filter, subEff);
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default CategoryFilterProduct;

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2; //Do not change the solidity version as it negatively impacts submission grading

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "hardhat/console.sol";

contract DaovationNFT is
	ERC721,
    Pausable,
	ERC721Enumerable,
	ERC721URIStorage,
	Ownable
{
    
    uint256 public cost = 1 ether;
   

	using Counters for Counters.Counter;

	Counters.Counter public tokenIdCounter;

	constructor() ERC721("DaovationNFT", "SOL") {}

	function _baseURI() internal pure override returns (string memory) {
		return "https://ipfs.io/ipfs/";
	}

	function mintItem(address to, string memory uri, uint256 _mintAmount) public payable returns (uint256) {
      
        //require(!paused, "Sale not active");
        require(_mintAmount > 0, "you must mint at least one");
    
        
        
         
         require(
                msg.value >= cost * _mintAmount,
                "Insufficient payment, more ETH per item"
            );

		tokenIdCounter.increment();
		uint256 tokenId = tokenIdCounter.current();
        require(tokenId <= 10,"I reached the pre-sale limit");
        
		_safeMint(to, tokenId);
		_setTokenURI(tokenId, uri);
        if(tokenId == 10){
            _pause();
        }
		return tokenId;
	}

      function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }


	// The following functions are overrides required by Solidity.

	function _beforeTokenTransfer(
		address from,
		address to,
		uint256 tokenId
	) internal override(ERC721, ERC721Enumerable) {
		super._beforeTokenTransfer(from, to, tokenId);
	}

	function _burn(
		uint256 tokenId
	) internal override(ERC721, ERC721URIStorage) {
		super._burn(tokenId);
	}

	function tokenURI(
		uint256 tokenId
	) public view override(ERC721, ERC721URIStorage) returns (string memory) {
		return super.tokenURI(tokenId);
	}

	function supportsInterface(
		bytes4 interfaceId
	) public view override(ERC721, ERC721Enumerable) returns (bool) {
		return super.supportsInterface(interfaceId);
	}
    function withdraw() public payable onlyOwner {
        (bool os, ) = payable(owner()).call{value: address(this).balance}("");
        require(os);
    }
}
